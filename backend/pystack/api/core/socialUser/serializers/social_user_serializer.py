from pystack.api.core.socialUser.models import SocialUser
from pystack.api.core.roots.serializers.roots_entity_serializer import (
    RootsEntitySerializer,
)


class SocialUserSerializer(RootsEntitySerializer):
    class Meta:
        model = SocialUser
        fields = SocialUser.serializer_fields()
        read_only_fields = SocialUser.readonly_fields()
