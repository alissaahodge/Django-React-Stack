from rest_framework.request import Request
from rest_framework.response import Response
from pystack.api.apps.blog.models import BlogPost

from django.http import JsonResponse
from django.db.models import Q
from pystack.api.core.roots.views import RootsEntityAPIView


class BlogFilterView(RootsEntityAPIView):
    """Blog Filter View class"""

    @classmethod
    def get(cls, request: Request, search, tags):
        """Takes in a filter request and outputs records accordingly"""
        blogRecords = []
        if search != 'none':
            try:
                querysets = BlogPost.objects.filter(
                    Q(title__icontains=search)
                    | Q(message__icontains=search)
                    | Q(tags__icontains=tags)
                )
            except BlogPost.DoesNotExist:
                querysets = None
            else:
                for queryset in querysets:
                    results = BlogFilterView.queryData(queryset)
                    blogRecords.append(results)
        else:
            querysets = None

        return JsonResponse(blogRecords, safe=False)


    def queryData(queryset):
        querylist = {}
        querylist["id"] = queryset.id
        querylist["title"] = queryset.title
        querylist["message"] = queryset.message
        querylist["tags"] = queryset.tags
        querylist["created"] = queryset.created
        querylist["modified"] = queryset.modified
        querylist["created_by_id"] = queryset.created_by_id
        querylist["modified_by_id"] = queryset.modified_by_id
        return querylist
