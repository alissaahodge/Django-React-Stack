from rest_framework.request import Request
from rest_framework.response import Response

from pystack.api.core.roots.views import RootsEntityAPIView


class BlogView(RootsEntityAPIView):
    @classmethod
    def get(cls, request: Request):
        data = {"message": "Hello, welcome to Django blog."}

        return Response(data)
