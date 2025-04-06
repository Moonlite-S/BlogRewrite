from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import User
from .serializers import UserSerializer, UserListSerializer

# View for the User model.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'uuid'

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsAdminUser()]
        return super().get_permissions()

    def get_queryset(self):
        if self.action == 'list':
            return User.objects.filter(is_staff=False)
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(is_staff=False)

    def perform_update(self, serializer):
        serializer.save(is_staff=False)

    def perform_destroy(self, instance):
        instance.delete()   