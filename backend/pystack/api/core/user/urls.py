from django.urls import path, include
from rest_framework import routers

from pystack.api.core.user import views
from pystack.api.core.user.views import UserFilterView

router = routers.DefaultRouter()
router.register(r"", views.UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("filter/", views.UserFilterView.as_view()),
]
