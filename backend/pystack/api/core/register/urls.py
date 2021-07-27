from django.urls import path, include
from rest_framework import routers

from pystack.api.core.register import views as v


urlpatterns = [
    path("", v.register, name="register"),
    path("username_exists/", v.username_exists, name="username_check"),
    path("email_exists/", v.email_exists, name="email_check"),
    path("social_register", v.social_register, name="social_register"),
]
