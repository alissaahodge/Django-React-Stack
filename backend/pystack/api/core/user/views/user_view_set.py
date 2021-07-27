from django.contrib.auth.models import User
from rest_framework import viewsets

from pystack.api.core.user.serializers.user_serializer import UserSerializer
from pystack.api.core.roots.views import RootsEntityAPIView
from django.http import JsonResponse
from rest_framework.request import Request
from django.db.models import Q


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserFilterView(RootsEntityAPIView):
    @classmethod
    def get(cls, request: Request):
        searchTerm = request.GET["pageQuery"]
        results = []
        if searchTerm:
            querysets = User.objects.filter(
                Q(first_name__icontains=searchTerm)
                | Q(last_name__icontains=searchTerm)
                | Q(email__icontains=searchTerm)
                | Q(username__icontains=searchTerm)
            )
            for queryset in querysets:
                querylist = {}
                querylist["id"] = queryset.id
                querylist["first_name"] = queryset.first_name
                querylist["last_name"] = queryset.last_name
                querylist["email"] = queryset.email
                querylist["username"] = queryset.username

                results.append(querylist)
        else:
            querysets = User.objects.all()
            for queryset in querysets:
                querylist = {}
                querylist["id"] = queryset.id
                querylist["first_name"] = queryset.first_name
                querylist["description"] = queryset.last_name
                querylist["email"] = queryset.email
                querylist["username"] = queryset.username

                results.append(querylist)

        return JsonResponse(results, safe=False)
