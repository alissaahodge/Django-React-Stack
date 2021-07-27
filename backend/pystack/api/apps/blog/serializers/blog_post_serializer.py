from pystack.api.apps.blog.models import BlogPost
from pystack.api.core.roots.serializers.roots_entity_serializer import (
    RootsEntitySerializer,
)


class BlogPostSerializer(RootsEntitySerializer):
    class Meta:
        model = BlogPost
        fields = BlogPost.serializer_fields()
        read_only_fields = BlogPost.readonly_fields()
