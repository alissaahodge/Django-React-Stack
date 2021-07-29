from django.urls import path, include
from rest_framework import routers

from pystack.api.apps.blog import views

router = routers.DefaultRouter()
router.register(r"", views.BlogPostViewSet)

urlpatterns = [
    path("", views.BlogView.as_view()),
    path("posts/", include(router.urls)),
    path("search/searchQuery-<str:search>&tags-<str:tags>", views.BlogFilterView.as_view()),
    path("stats/", views.BlogPostStatsView.as_view()),
]
