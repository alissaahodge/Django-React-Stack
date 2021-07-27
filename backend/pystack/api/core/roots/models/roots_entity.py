import json
from _operator import or_
from django.contrib.auth import get_user_model
from django.core import serializers
from django.db import models
from django.db.models import Q
from functools import reduce
from operator import and_
from querybuilder.query import Query


class RootsEntity(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    created = models.DateTimeField(auto_now_add=True, null=True, editable=False)
    created_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        related_name="%(app_label)s_%(class)s_created_by",
        null=True,
        blank=True,
    )
    modified = models.DateTimeField(auto_now=True, null=True, editable=False)
    modified_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        related_name="%(app_label)s_%(class)s_modified_by",
        null=True,
        blank=True,
    )

    class Meta:
        abstract = True

    @staticmethod
    def readonly_fields():
        return RootsEntity.serializer_fields()

    @staticmethod
    def serializer_fields():
        return ["id", "created", "created_by", "modified", "modified_by"]

    @staticmethod
    def get_operator(op):
        result = None
        comparison_map = {
            "EXACT": "exact",
            "=": "eq",
            ">": "gt",
            ">=": "gte",
            "<": "lt",
            "<=": "lte",
            "LIKE": "contains",
            "IN": "in",
        }
        if op in comparison_map:
            result = comparison_map[op]
        return result

    @staticmethod
    def get_paged_records(start, limit, sort, search, meta=False, count_only=False):
        results = {"page": [], "total": 0}

        primary_alias = "id"
        db_table = "roots"

        query = Query().from_table(db_table, [primary_alias])

        if search:
            for key, value in search.items():
                if isinstance(value, dict):
                    field = value["field"]
                    if "clause" in value:
                        # START OF THE OR BLOCK
                        if value["clause"] == "OR":
                            if isinstance(value["value"], list):
                                print("another value", value["value"])
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
            query.order_by(sort["field"], sort["order"])
        else:
            query.order_by(primary_alias)
        # apply the limit per page.
        query.limit(limit, start)

        print("SQL", query.get_sql())
        #  Load the records
        records = RootsEntity.objects.raw(query.get_sql(), query.get_args())

        for record in records:
            obj = RootsEntity.objects.get(pk=record.id)
            data = serializers.serialize("json", [obj,])
            struct = json.loads(data)
            results["page"].append(struct[0]["fields"])
        # Grab the total records count
        results["total"] = RootsEntity.objects.all().count()
        return results
