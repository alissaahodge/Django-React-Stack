from django.contrib.auth.models import User
from rest_framework import serializers
from pystack.api.apps.upload.models import Upload
from rest_framework import serializers as m
from pystack.api.core.socialUser.models import SocialUser


class UserSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField("get_user_profile_photo")
    social_user = m.SerializerMethodField("get_social_user_info")

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "is_superuser",
            "is_staff",
            "is_active",
            "last_login",
            "date_joined",
            "id",
            "photo",
            "social_user",
        ]
        read_only_fields = ["date_joined", "last_login"]

    def get_user_profile_photo(self, obj):
        """grabs any logo photo attached to this user obj"""
        try:
            response_data = Upload.objects.get(module_record_id=obj.id)
            data = str(response_data.file)
        except Upload.DoesNotExist:
            data = None

        # data = json.loads(response_data)
        return data

    def get_social_user_info(self, obj):
        """checks if the user account has any social account attached to it and grabs that info"""
        try:
            data = SocialUser.objects.get(social_id=obj.username)
            response_date = {
                "first_name": data.firstName,
                "last_name": data.lastName,
                "name": data.name,
                "photoUrl": data.photoUrl,
                "username": data.firstName + " " + data.lastName,
            }
            return response_date
        except SocialUser.DoesNotExist:
            response_data = None
            return response_data
