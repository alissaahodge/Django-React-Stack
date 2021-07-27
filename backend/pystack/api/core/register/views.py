from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

# from pystack.api.core.socialUser.models import SocialUser
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from pystack.api.core.roots.views import RootsEntityAPIView
from django.http import HttpResponse
import json
from django.core.mail import EmailMultiAlternatives
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import base64
from pystack.api.core.socialUser.models import SocialUser


@csrf_exempt
def register(response):
    if response.method == "POST":

        form = UserCreationForm(response.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password1")
            user.first_name = response.POST["first_name"]
            user.last_name = response.POST["last_name"]
            user.email = response.POST["email"]
            if "is_superuser" in response.POST and "is_staff" in response.POST:
                is_superuser_ = response.POST["is_superuser"]
                is_staff_ = response.POST["is_staff"]
                user.save()
            else:
                user.save()
                user = authenticate(username=username, password=password)
                login(response, user)
            form.message = "Here's a tip"
    else:
        form = UserCreationForm()

    return render(response, "register/register.html", {"form": form})


@csrf_exempt
def social_register(response):
    if response.method == "POST":
        print(response.POST["password1"])
        username_ = response.POST["username"]
        password_ = make_password(
            response.POST["password1"], salt=None, hasher="default"
        )
        first_name_ = response.POST["first_name"]
        last_name_ = response.POST["last_name"]
        email_ = response.POST["email"]
        provider_ = response.POST["provider"]
        photo_url_ = response.POST["photoUrl"]
        name_ = response.POST["name"]
        social_id_ = response.POST["social_id"]
        data = User.objects.create(
            password=password_,
            first_name=first_name_,
            last_name=last_name_,
            email=email_,
            username=username_,
        )
        social_date = SocialUser.objects.create(
            social_id=social_id_,
            email=email_,
            provider=provider_,
            firstName=first_name_,
            photoUrl=photo_url_,
            lastName=last_name_,
            name=name_,
        )
        print(data)
        print(social_date)
    return HttpResponse(json.dumps({"success": True}), content_type="application/json")


@csrf_exempt
def email_exists(response):
    if User.objects.filter(email=response.POST["email"]).exists():
        return HttpResponse(
            json.dumps({"email_exists": True}), content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"email_exists": False}), content_type="application/json"
        )


@csrf_exempt
def username_exists(response):
    if User.objects.filter(username=response.POST["username"]).exists():
        return HttpResponse(
            json.dumps({"username_exists": True}), content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"username_exists": False}), content_type="application/json"
        )
