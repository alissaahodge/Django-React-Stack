from django.db import models

from pystack.api.core.roots.models import RootsEntity


class Memo(RootsEntity):
    title = models.CharField(max_length=255)
    body = models.TextField()

    class Meta:
        db_table = "app_memo"
        ordering = ["-id"]

    @staticmethod
    def serializer_fields():
        return RootsEntity.serializer_fields() + ["title", "body"]
