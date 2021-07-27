from pystack.api.apps.memo.models import Memo
from pystack.api.core.roots.serializers.roots_entity_serializer import (
    RootsEntitySerializer,
)


class MemoSerializer(RootsEntitySerializer):
    class Meta:
        model = Memo
        fields = Memo.serializer_fields()
        read_only_fields = Memo.readonly_fields()
