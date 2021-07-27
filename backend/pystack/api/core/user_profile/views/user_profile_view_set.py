from pystack.api.core.user_profile.models import UserProfile
from pystack.api.core.user_profile.serializers.user_profile_serializer import (
    UserProfileSerializer,
)
from pystack.api.core.roots.views import RootsEntityViewSet


class UserProfileViewSet(RootsEntityViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
