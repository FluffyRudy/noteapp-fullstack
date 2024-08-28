from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from django.contrib.auth.models import User
from .serializers import NoteSerializer, UserSerializer
from .models import Note

"""
get queryset is override otherwise even other authenticated user can access data even if that data doesnt belong to them 
"""


class Home(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        content = {"message": "Hello World0"}
        return Response(content)


class UserCreation(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.pk)


class NoteList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer: NoteSerializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        """override to allow user to access own notes"""
        return Note.objects.filter(author=self.request.user)


class NoteDetail(generics.RetrieveAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)
