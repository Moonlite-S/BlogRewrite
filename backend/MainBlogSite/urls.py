from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from blog.views import BlogPostViewSet
from user_auth.views import UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()

# Include the blog and user_auth URLs.
blog_router = routers.DefaultRouter()
blog_router.register(r'blogs', BlogPostViewSet, basename='blogs')

user_auth_router = routers.DefaultRouter()
user_auth_router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include(blog_router.urls)),
    path('api/', include(user_auth_router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]