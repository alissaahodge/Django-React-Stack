"""pystack URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("auth/", include("pystack.api.core.auth.urls")),
    path("users/", include("pystack.api.core.user.urls")),
    path("register/", include("pystack.api.core.register.urls")),
    path("socialUser/", include("pystack.api.core.socialUser.urls")),
    path("blog/", include("pystack.api.apps.blog.urls")),
    path("memos/", include("pystack.api.apps.memo.urls")),
    path("upload/", include("pystack.api.apps.upload.urls")),
]
