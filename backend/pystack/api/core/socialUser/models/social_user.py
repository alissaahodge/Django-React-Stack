import json
from _operator import or_
from django.core import serializers
from django.db import models
from django.db.models import Q
from functools import reduce
from operator import and_
from querybuilder.query import Query

from pystack.api.core.roots.models import RootsEntity


class SocialUser(RootsEntity):
    email = models.CharField(max_length=255)
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    photoUrl = models.CharField(max_length=255)
    provider = models.CharField(max_length=255)
    social_id = models.CharField(max_length=355)

    class Meta:
        db_table = "app_social_user"
        ordering = ["-id"]

    @staticmethod
    def serializer_fields():
        return RootsEntity.serializer_fields() + [
            "email",
            "firstName",
            "lastName",
            "name",
            "photoUrl",
            "provider",
            "social_id",
        ]

    @staticmethod
    def get_paged_records(start, limit, sort, search, meta=False, count_only=False):
        results = {"page": [], "total": 0}

        primary_alias = "id"
        db_table = "app_social_user"

        query = Query().from_table(db_table, [primary_alias])
        if search:
            for key, value in search.items():
                if isinstance(value, dict):
                    field = value["field"]
                    if "clause" in value:
                        # START OF THE OR BLOCK
                        if value["clause"] == "OR":
                            if isinstance(value["value"], list):
                                or_condition = reduce(
                                    or_, (Q(**{field: val}) for val in value["value"])
                                )
                            else:
                                or_condition = Q(**{field: value["value"]})

                            query.where(or_condition)
                        # END OF THE OR BLOCK
                        # START OF THE AND BLOCK
                        elif value["clause"] == "AND":
                            if isinstance(value["value"], list):
                                and_condition = reduce(
                                    and_, (Q(**{field: val}) for val in value["value"])
                                )
                            else:
                                and_condition = Q(**{field: value["value"]})
                            query.where(and_condition)
                        # END OF THE AND BLOCK
                        else:
                            search_type = RootsEntity.get_operator(value["operator"])
                            filter_type = field + "__" + search_type
                            query.where(**{filter_type: value["value"]})

                    else:
                        search_type = RootsEntity.get_operator(value["operator"])
                        filter_type = field + "__" + search_type
                        query.where(**{filter_type: value["value"]})

                else:
                    search_type = RootsEntity.get_operator(value["operator"])
                    filter_type = key + "__" + search_type
                    query.where(**{filter_type: value["value"]})

        if sort:
            query.order_by("-" + sort["field"])
        else:
            query.order_by(primary_alias)
        # apply the limit per page.
        query.limit(limit, start)

        #  Load the records
        print(query.get_sql())
        records = SocialUser.objects.raw(query.get_sql(), query.get_args())

        for record in records:
            obj = SocialUser.objects.get(pk=record.id)
            data = serializers.serialize("json", [obj,])
            struct = json.loads(data)
            data = json.dumps(struct[0])
            results["page"].append(struct[0]["fields"])
        # Grab the total records count
        results["total"] = SocialUser.objects.all().count()
        return results
