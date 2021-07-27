from rest_framework.request import Request
from rest_framework.response import Response
from pystack.api.core.socialUser.models import SocialUser
import json
from django.http import HttpResponse

from pystack.api.core.roots.views import RootsEntityAPIView


class SocialUserView(RootsEntityAPIView):
    @classmethod
    def get(cls, request: Request):
        data = {"message": "Hello, welcome to Django blog."}

        return Response(data)

    @classmethod
    def patch(cls, request: Request):
        social_user = SocialUser.objects.get(social_id=request.data["social_id"])
        social_user.name = request.data["name"]
        social_user.firstName = request.data["firstName"]
        social_user.lastName = request.data["lastName"]
        social_user.provider = request.data["provider"]
        social_user.photoUrl = request.data["photoUrl"]
        social_user.email = request.data["email"]
        social_user.save()

        data = {"socialUser": social_user}
        return Response()
