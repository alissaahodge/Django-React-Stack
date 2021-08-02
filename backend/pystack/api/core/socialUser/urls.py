from django.urls import path, include
from rest_framework import routers

from pystack.api.core.socialUser import views

router = routers.DefaultRouter()
router.register(r"", views.SocialUserViewSet)

urlpatterns = [
    path("", views.SocialUserView.as_view()),
    path("posts/", include(router.urls)),
    # path('posts/<int:social_id>/', include(router.urls)),
    path("stats/", views.SocialUserStatsView.as_view()),
    path('social/<str:backend>/', views.views.exchange_token),
]
