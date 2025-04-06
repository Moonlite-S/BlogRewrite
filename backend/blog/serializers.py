from rest_framework import serializers
from .models import BlogPost

# Serializer that holds all the fields for the BlogPost model.
class BlogPostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['uuid', 'title', 'content', 'author', 'created_at', 'updated_at', 'status']
        read_only_fields = ['uuid', 'created_at', 'updated_at']

# Serializer that holds the fields for the BlogPost model that are used in the list view.
class BlogPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['uuid', 'title', 'author', 'created_at', 'status']
        read_only_fields = ['uuid', 'created_at']

# Serializer meant for creating a new BlogPost.
class BlogPostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'status']

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user # I mean, this is always me, but I'm keeping it here just in case I want to add more users.
        return super().create(validated_data)
    
# Serializer meant for updating a BlogPost.
class BlogPostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'status']
