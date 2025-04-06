from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db import IntegrityError
import uuid

User = get_user_model()

# Create your tests here.
class UserModelTests(TestCase):

    def test_create_user(self):
        """Test creating a new user is successful."""
        email = 'test@example.com'
        username = 'testuser'
        password = 'password123'
        user = User.objects.create_user(username=username, email=email, password=password)

        self.assertEqual(user.username, username)
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)
        self.assertIsNotNone(user.uuid)
        # Ensure UUID is valid
        self.assertIsInstance(user.uuid, uuid.UUID)

        print(f"Created User: {user.username} - {user.uuid}")

    def test_create_superuser(self):
        """Test creating a new superuser is successful."""
        email = 'super@example.com'
        username = 'superuser'
        password = 'password123'
        admin_user = User.objects.create_superuser(username=username, email=email, password=password)

        self.assertEqual(admin_user.username, username)
        self.assertEqual(admin_user.email, email)
        self.assertTrue(admin_user.check_password(password))
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        self.assertTrue(admin_user.is_active)
        self.assertIsNotNone(admin_user.uuid)
        print(f"Created Superuser: {admin_user.username}")

    def test_read_user(self):
        """Test reading user information."""
        username = 'readtest'
        user = User.objects.create_user(username=username, password='password123')
        retrieved_user = User.objects.get(username=username)
        self.assertEqual(user.uuid, retrieved_user.uuid)

    def test_update_user(self):
        """Test updating user information."""
        username = 'updatetest'
        user = User.objects.create_user(username=username, password='password123', first_name='Initial')
        user.first_name = 'Updated'
        user.last_name = 'User'
        user.email = 'update@example.com'
        user.save()

        updated_user = User.objects.get(username=username)
        self.assertEqual(updated_user.first_name, 'Updated')
        self.assertEqual(updated_user.last_name, 'User')
        self.assertEqual(updated_user.email, 'update@example.com')

    def test_delete_user(self):
        """Test deleting a user."""
        username = 'deletetest'
        user = User.objects.create_user(username=username, password='password123')
        user_count_before = User.objects.count()
        user.delete()
        user_count_after = User.objects.count()
        self.assertEqual(user_count_after, user_count_before - 1)
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(username=username)

    def test_username_uniqueness(self):
        """Test that usernames must be unique."""
        username = 'uniqueuser'
        User.objects.create_user(username=username, password='password123')
        with self.assertRaises(IntegrityError):
            User.objects.create_user(username=username, password='password456')

    def test_uuid_auto_generated(self):
        """Test that the UUID field is auto-generated and unique."""
        user1 = User.objects.create_user(username='user1', password='pass1')
        user2 = User.objects.create_user(username='user2', password='pass2')
        self.assertIsNotNone(user1.uuid)
        self.assertIsInstance(user1.uuid, uuid.UUID)
        self.assertNotEqual(user1.uuid, user2.uuid)
