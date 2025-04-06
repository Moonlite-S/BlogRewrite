from django.test import TestCase
from user_auth.models import User
from .models import BlogPost
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken


# Create your tests here.

class BlogPostModelTests(TestCase):
    def setUp(self):
        """Set up a test user that can be used as an author."""
        self.user = User.objects.create_user(username='testuser', password='password123')

    def test_create_blog_post(self):
        """Test that a BlogPost can be created successfully."""
        post = BlogPost.objects.create(
            title='Test Title',
            content='Test content.',
            author=self.user,
            status='draft'
        )
        self.assertEqual(post.title, 'Test Title')
        self.assertEqual(post.content, 'Test content.')
        self.assertEqual(post.author, self.user)
        self.assertEqual(post.status, 'draft')
        self.assertIsNotNone(post.uuid)
        self.assertIsNotNone(post.created_at)
        self.assertIsNotNone(post.updated_at)
        print(f"Created Post: {post}") # Added print for visibility during test run

    def test_read_blog_post(self):
        """Test that a BlogPost can be retrieved."""
        post = BlogPost.objects.create(
            title='Read Test',
            content='Content for reading.',
            author=self.user,
            status='published'
        )
        retrieved_post = BlogPost.objects.get(uuid=post.uuid)
        self.assertEqual(retrieved_post.title, 'Read Test')
        self.assertEqual(retrieved_post.status, 'published')

    def test_update_blog_post(self):
        """Test that a BlogPost can be updated."""
        post = BlogPost.objects.create(
            title='Update Test',
            content='Initial content.',
            author=self.user,
            status='draft'
        )

        post.title = 'Updated Title'
        post.content = 'Updated content.'
        post.status = 'published'
        post.full_clean()
        post.save()

        updated_post = BlogPost.objects.get(uuid=post.uuid)
        self.assertEqual(updated_post.title, 'Updated Title')
        self.assertEqual(updated_post.content, 'Updated content.')
        self.assertEqual(updated_post.status, 'published')
        # Check that updated_at is greater than created_at after save
        self.assertGreater(updated_post.updated_at, updated_post.created_at)


    def test_delete_blog_post(self):
        """Test that a BlogPost can be deleted."""
        post = BlogPost.objects.create(
            title='Delete Test',
            content='Content to be deleted.',
            author=self.user,
            status='archived'
        )
        post_uuid = post.uuid
        count_before_delete = BlogPost.objects.count()
        post.delete()
        count_after_delete = BlogPost.objects.count()

        self.assertEqual(count_after_delete, count_before_delete - 1)
        with self.assertRaises(BlogPost.DoesNotExist):
            BlogPost.objects.get(uuid=post_uuid)

    def test_string_representation(self):
        """Test the string representation of the BlogPost model."""
        post = BlogPost.objects.create(
            title='String Test',
            content='Content for string test.',
            author=self.user,
            status='published'
        )
        expected_string = f"{post.title} - {post.status} - {post.created_at}"
        self.assertEqual(str(post), expected_string)

class BlogPostViewSetTests(APITestCase):
    def setUp(self):
        """Set up admin and regular users and generate JWT tokens for them."""
        self.admin_user = User.objects.create_superuser(username='adminuser', password='password123', email='admin@test.com')
        self.regular_user = User.objects.create_user(username='testuser', password='password123')

        # Generate JWT tokens
        admin_refresh = RefreshToken.for_user(self.admin_user)
        self.admin_access_token = str(admin_refresh.access_token)

        regular_refresh = RefreshToken.for_user(self.regular_user)
        self.regular_access_token = str(regular_refresh.access_token)

    def test_create_blog_post(self):
        """Test that a BlogPost can be created successfully by an admin using JWT."""
        self.assertTrue(self.admin_user.is_staff)
        url = reverse('blogs-list')
        data = {
            'title': 'Test Title JWT',
            'content': 'Test content.',
            'status': 'published'
        }
        # Set JWT header for admin user
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_access_token}')
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(BlogPost.objects.count(), 1)
        self.assertEqual(BlogPost.objects.get().title, 'Test Title JWT')

    def test_create_blog_post_unauthorized(self):
        """Test that a BlogPost cannot be created by a regular user using JWT."""
        url = reverse('blogs-list')
        data = {
            'title': 'Unauthorized Test JWT',
            'content': 'Content for unauthorized test.',
            'status': 'published'
        }
        # Set JWT header for regular user
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.regular_access_token}')
        response = self.client.post(url, data, format='json')

        # Regular user does not have admin permission
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_blog_post_unauthenticated(self):
        """Test that a BlogPost cannot be created by an unauthenticated user."""
        url = reverse('blogs-list')
        data = {
            'title': 'Unauthenticated Test',
            'content': 'Content for unauthenticated test.',
            'status': 'published'
        }
        unauthenticated_client = APIClient()
        response = unauthenticated_client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_blog_posts(self):
        """Test listing blog posts (requires auth based on default permissions)."""
        url = reverse('blogs-list')
        # Set JWT header for admin user (or regular if they should have list perms)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_access_token}')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # You might need to create some posts first to test the listing properly
        self.assertEqual(len(response.data), 0)

    def test_retrieve_blog_post(self):
        """Test retrieving a blog post using JWT."""
        post = BlogPost.objects.create(
            title='Retrieve Test JWT',
            content='Content for retrieval.',
            author=self.admin_user,
            status='published'
        )
        url = reverse('blogs-detail', kwargs={'uuid': post.uuid})
        # Set JWT header for admin user (or regular if they should have retrieve perms)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_access_token}')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Retrieve Test JWT')
        self.assertEqual(response.data['status'], 'published')

    def test_update_blog_post(self):
        """Test updating a blog post using JWT (requires admin)."""
        post = BlogPost.objects.create(
            title='Update Test JWT',
            content='Initial content.',
            author=self.admin_user,
            status='draft'
        )
        url = reverse('blogs-detail', kwargs={'uuid': post.uuid})
        data = {
            'title': 'Updated Title JWT',
            'content': 'Updated content.',
            'status': 'published'
        }
        # Set JWT header for admin user
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_access_token}')
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        post.refresh_from_db() # Refresh instance data from DB
        self.assertEqual(post.title, 'Updated Title JWT')
        self.assertEqual(post.content, 'Updated content.')
        self.assertEqual(post.status, 'published')

    def test_update_blog_post_partial(self):
        """Test partially updating a blog post using JWT (requires admin)."""
        post = BlogPost.objects.create(
            title='Partial Update Test JWT',
            content='Initial content.',
            author=self.admin_user,
            status='draft'
        )
        url = reverse('blogs-detail', kwargs={'uuid': post.uuid})
        data = {
            'title': 'Updated Title Partial JWT'
        }
        # Set JWT header for admin user
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_access_token}')
        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        post.refresh_from_db() # Refresh instance data from DB
        self.assertEqual(post.title, 'Updated Title Partial JWT')
        self.assertEqual(post.content, 'Initial content.') # Should be unchanged
        self.assertEqual(post.status, 'draft') # Should be unchanged

    def test_update_blog_post_unauthorized(self):
        """Test that a BlogPost cannot be updated by a regular user using JWT."""
        post = BlogPost.objects.create(
            title='Update Unauthorized JWT',
            content='Initial content.',
            author=self.admin_user,
            status='draft'
        )
        url = reverse('blogs-detail', kwargs={'uuid': post.uuid})
        data = {
            'title': 'Updated by Regular?'
        }
        # Set JWT header for regular user
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.regular_access_token}')
        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_blog_post_unauthenticated(self):
        """Test that a BlogPost cannot be updated by an unauthenticated user."""
        post = BlogPost.objects.create(
            title='Update Test Unauth JWT',
            content='Initial content.',
            author=self.admin_user,
            status='draft'
        )
        url = reverse('blogs-detail', kwargs={'uuid': post.uuid})
        data = {
            'title': 'Updated Title Unauth'
        }
        unauthenticated_client = APIClient()
        response = unauthenticated_client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_blog_post(self):
        """Test deleting a blog post using JWT (requires admin)."""
        post = BlogPost.objects.create(
            title='Delete Test JWT',
            content='Content to be deleted.',
            author=self.admin_user,
            status='archived'
        )
        url = reverse('blogs-detail', kwargs={'uuid': post.uuid})
        # Set JWT header for admin user
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_access_token}')
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(BlogPost.objects.count(), 0)
        # Check deletion by trying to get it
        with self.assertRaises(BlogPost.DoesNotExist):
             BlogPost.objects.get(uuid=post.uuid)

    def test_delete_blog_post_unauthorized(self):
        """Test that a BlogPost cannot be deleted by a regular user using JWT."""
        post = BlogPost.objects.create(
            title='Delete Unauthorized JWT',
            content='Content to be deleted.',
            author=self.admin_user,
            status='archived'
        )
        url = reverse('blogs-detail', kwargs={'uuid': post.uuid})
        # Set JWT header for regular user
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.regular_access_token}')
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(BlogPost.objects.count(), 1)

    def test_delete_blog_post_unauthenticated(self):
        """Test that a BlogPost cannot be deleted by an unauthenticated user."""
        post = BlogPost.objects.create(
            title='Delete Test Unauth JWT',
            content='Content to be deleted.',
            author=self.admin_user,
            status='archived'
        )
        url = reverse('blogs-detail', kwargs={'uuid': post.uuid})
        unauthenticated_client = APIClient()
        response = unauthenticated_client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(BlogPost.objects.count(), 1)