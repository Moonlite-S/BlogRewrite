from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

# The base user model for the blog site.
# For the most part, I don't want to add any users, just myself, but I'm keeping this here for future reference.
class User(AbstractUser):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    pass

# Me
class Admin(User):
    pass