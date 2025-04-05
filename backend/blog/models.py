from django.db import models
from user_auth.models import User
import uuid

STATUS_CHOICES = [
    ('draft', 'Draft'),
    ('published', 'Published'),
    ('archived', 'Archived'),
]

class BlogPost(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)    
    title = models.CharField(max_length=200)
    content = models.TextField()
    attachments = models.FileField(upload_to='blog_attachments/', blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.title} - {self.status} - {self.created_at}"
