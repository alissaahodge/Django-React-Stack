from pystack.api.core.user_profile.models import UserProfile
from pystack.api.core.roots.serializers.roots_entity_serializer import (
    RootsEntitySerializer,
)


class UserProfileSerializer(RootsEntitySerializer):
    class Meta:
        model = UserProfile
        fields = UserProfile.serializer_fields()
        read_only_fields = UserProfile.readonly_fields()
