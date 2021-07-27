from django.contrib import admin

from pystack.api.apps.blog.models import BlogPost


admin.site.register(BlogPost)
