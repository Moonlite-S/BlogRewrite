from django.shortcuts import render
from .models import BlogPost
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import BlogPostDetailSerializer, BlogPostCreateSerializer, BlogPostListSerializer, BlogPostUpdateSerializer

# View for the BlogPost model.
class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'uuid'

    def get_serializer_class(self):
        if self.action == 'create':
            return BlogPostCreateSerializer
        elif self.action == 'list':
            return BlogPostListSerializer
        elif self.action == 'update':
            return BlogPostUpdateSerializer
        return BlogPostDetailSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return super().get_permissions()

    def get_queryset(self):
        if self.action == 'list':
            return BlogPost.objects.filter(status='published')
        return super().get_queryset()
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()