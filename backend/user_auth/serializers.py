from rest_framework import serializers
from .models import User

# Serializer that holds all the fields for the User model.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['uuid', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'is_superuser']
        read_only_fields = ['uuid', 'is_staff', 'is_active', 'is_superuser']

# Serializer that holds the fields for the User model that are used in the list view.
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['uuid', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['uuid']