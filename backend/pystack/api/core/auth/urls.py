from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("", include("rest_framework.urls")),
    path("oauth/token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("oauth/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
]
