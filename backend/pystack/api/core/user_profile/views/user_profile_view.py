from rest_framework.request import Request
from rest_framework.response import Response
from pystack.api.core.user_profile.models import UserProfile
from pystack.api.core.roots.views import RootsEntityAPIView


class UserProfileView(RootsEntityAPIView):
    @classmethod
    def get(cls, request: Request):
        try:
            response = UserProfile.objects.get(user_id=request.GET["id"])
            data = {
                "id": response.id,
                "user_id": response.user_id,
                "institution": response.institution,
                "institution_username": response.institution_username,
                "institution_password": response.institution_password,
            }
            return Response(data)
        except UserProfile.DoesNotExist:
            return Response()

    @classmethod
    def post(cls, request: Request):
        user_id_ = request.data["user_id"]
        institution_ = request.data["institution"]
        institution_username_ = request.data["institution_username"]
        institution_password_ = request.data["institution_password"]
        try:
            user_profile = UserProfile.objects.get(user_id=request.data["user_id"])
            return Response()
        except UserProfile.DoesNotExist:
            response = UserProfile.objects.create(
                user_id=user_id_,
                institution=institution_,
                institution_username=institution_username_,
                institution_password=institution_password_,
            )
            data = {
                "id": response.id,
                "user_id": response.user_id,
                "institution": response.institution,
                "institution_username": response.institution_username,
                "institution_password": response.institution_password,
            }

            return Response(data)
