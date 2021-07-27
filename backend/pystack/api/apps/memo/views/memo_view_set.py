from pystack.api.apps.memo.models import Memo
from pystack.api.apps.memo.serializers.memo_serializer import MemoSerializer
from pystack.api.core.roots.views import RootsEntityViewSet


class MemoViewSet(RootsEntityViewSet):
    queryset = Memo.objects.all()
    serializer_class = MemoSerializer
