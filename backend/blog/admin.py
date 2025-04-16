from django.contrib import admin
from .models import BlogPost

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'uuid', 'author', 'status', 'created_at', 'updated_at')
    list_display_links = ('title', 'uuid')
    list_editable = ('status',)
    list_filter = ('status', 'author')
    search_fields = ('title', 'content')
    readonly_fields = ('uuid', 'created_at', 'updated_at')
    list_per_page = 10

admin.site.register(BlogPost, BlogPostAdmin)