"""Upload Serializer"""
from pystack.api.apps.upload.models import Upload
from pystack.api.core.roots.serializers.roots_entity_serializer import (
    RootsEntitySerializer,
)


class UploadSerializer(RootsEntitySerializer):
    class Meta:
        model = Upload
        fields = Upload.serializer_fields()
        read_only_fields = Upload.readonly_fields()
