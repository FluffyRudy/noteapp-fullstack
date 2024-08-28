from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import Note


class NoteAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="ball", password="zeldarpg")
        self.client.force_authenticate(user=self.user)

    def test_create_note(self):
        response = self.client.post(
            "/api/notes/create/",
            {"title": "Test Note", "content": "This is test note"},
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 1)
