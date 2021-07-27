from pystack.api.apps.blog.models import BlogPost
from pystack.api.apps.blog.serializers.blog_post_serializer import BlogPostSerializer
from pystack.api.core.roots.views import RootsEntityViewSet


class BlogPostViewSet(RootsEntityViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
