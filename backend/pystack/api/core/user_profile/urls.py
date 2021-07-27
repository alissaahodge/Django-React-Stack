from django.urls import path, include
from rest_framework import routers

from pystack.api.core.user_profile import views

router = routers.DefaultRouter()
router.register(r"", views.UserProfileViewSet)

urlpatterns = [
    path("", views.UserProfileView.as_view()),
    path("profile/", include(router.urls)),
    path("stats/", views.UserProfileStatsView.as_view()),
]
