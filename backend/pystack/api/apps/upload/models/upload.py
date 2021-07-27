"""Upload Model"""
from django.db import models
from pystack.api.core.roots.models import RootsEntity


class Upload(RootsEntity):
    """Defining the Upload Model"""

    module = models.CharField(max_length=255, null=True)
    file_type = models.CharField(max_length=255, null=True)
    module_record_id = models.IntegerField(null=True)
    file = models.FileField(upload_to="files/", null=True)

    class Meta:
        db_table = "app_upload"
        ordering = ["-id"]

    @staticmethod
    def serializer_fields():
        return RootsEntity.serializer_fields() + [
            "module",
            "module_record_id",
            "file",
            "file_type",
        ]
