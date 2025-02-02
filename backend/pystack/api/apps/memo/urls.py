from django.urls import path, include
from rest_framework import routers

from pystack.api.apps.memo import views

router = routers.DefaultRouter()
router.register(r"", views.MemoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
