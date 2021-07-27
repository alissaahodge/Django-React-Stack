"""defining url paths for upload module"""
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from pystack.api.apps.upload import views
from pystack.api.apps.upload.views import views as v

urlpatterns = [
    path("", v.image_view, name="image_upload"),
    path("success", v.success, name="success"),
    path("images", views.ImagesView.as_view()),
    path("all_images", v.get_images, name="display_images"),
    path("remove/<int:id>/", views.RemoveImagesView.as_view(), name="remove image"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
