from django import forms
from pystack.api.apps.upload.models.upload import Upload


class UploadForm(forms.ModelForm):
    class Meta:
        model = Upload
        fields = ["module", "module_record_id", "file", "file_type"]
