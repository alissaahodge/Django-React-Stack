from pystack.api.core.socialUser.models import SocialUser
from pystack.api.core.socialUser.serializers.social_user_serializer import (
    SocialUserSerializer,
)
from pystack.api.core.roots.views import RootsEntityViewSet


class SocialUserViewSet(RootsEntityViewSet):
    queryset = SocialUser.objects.all()
    serializer_class = SocialUserSerializer
