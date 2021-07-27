from rest_framework.request import Request
from rest_framework.response import Response

from pystack.api.core.user_profile.models import UserProfile
from pystack.api.core.roots.views import RootsEntityAPIView


class UserProfileStatsView(RootsEntityAPIView):
    @classmethod
    def get(cls, request: Request):
        stats = {
            "posts": {
                "post_count": UserProfile.objects.all().count(),
                "author_count": UserProfile.objects.values("created_by")
                .distinct()
                .count(),
            }
        }

        return Response(stats)

    @classmethod
    def post(cls, request: Request):

        search = None
        start = 0
        limit = 10
        sort = None
        if "filter_by" in request.data:
            search = request.data["filter_by"]

        if "start" in request.data:
            start = request.data["start"]
        if "limit" in request.data:
            limit = request.data["limit"]
        if "sort_by" in request.data:
            sort = request.data["sort_by"]

        results = UserProfile.get_paged_records(
            start, limit, sort, search, meta=False, count_only=False
        )

        return Response(results)
