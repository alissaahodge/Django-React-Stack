"""Upload View with functions used for endpoints"""
import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.request import Request
from django.core import serializers
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from pystack.api.core.roots.views import RootsEntityAPIView
from pystack.api.apps.upload.form import *
from pystack.api.apps.upload.models import Upload


@csrf_exempt
def image_view(request):
    # folder = "/files/"
    fs = FileSystemStorage()
    if request.method == "POST" and request.FILES["file"]:
        if request.POST.get("module") == "user":
            try:
                existing_upload = Upload.objects.get(
                    module_record_id=request.POST.get("module_record_id"), module="user"
                )
                file_name = str(existing_upload.file)
                fs.delete(file_name)
                existing_upload.delete()
            except Upload.DoesNotExist:
                existing_upload = None
        form = UploadForm(request.POST, request.FILES)
        myfile = request.FILES["file"]
        filename = fs.save(myfile.name, myfile)
        file_url = fs.url(filename)
        file_type = request.POST.get("file_type")
        module_record_id = request.POST.get("module_record_id")
        module = request.POST.get("module")
        obj = Upload.objects.create(
            file=myfile.name,
            file_type=file_type,
            module=module,
            module_record_id=module_record_id,
        )
        obj.save()
        return render(request, "upload.html", {"file_url": file_url}, {"form": form})
    else:
        return render(request, "upload.html", {"form": form})


def success(request):
    return HttpResponse("successfully uploaded")


# Create your views here.


class RemoveImagesView(RootsEntityAPIView):
    @classmethod
    def get(cls, request: Request, id):
        fs = FileSystemStorage()
        file = Upload.objects.get(id=id)
        file_name = str(file.file)
        fs.delete(file_name)
        file.delete()
        return Response()


# Create your views here.


@csrf_exempt
def get_images(request):
    """grabs images for the user"""
    if request.method == "GET":
        # getting all the objects of .
        upload = Upload.objects.all()
        print(upload)
        return render(request, "display_photo.html", {"images": upload})


class ImagesView(RootsEntityAPIView):
    @classmethod
    def get(cls, request: Request):
        response = serializers.serialize("json", Upload.objects.all())
        return Response(json.loads(response))
