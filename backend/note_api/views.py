from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import permissions
from django.contrib.auth.models import User
from django.http import Http404
from .serializers import UserSerializer, NoteSerializer
from .models import Note


class Home(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"message": f"{request.user.username.capitalize()}"})


class NotesList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)


class NoteCreate(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class NoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NoteSerializer


class NoteDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NoteSerializer

    def get_object(self):
        note_id = self.kwargs.get("pk")
        user = self.request.user
        try:
            note = Note.objects.get(id=note_id, author=user)
        except Note.DoesNotExist:
            raise Http404
        return note


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        user_id = self.kwargs.get("pk")

        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404
        return user


class UserCreate(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
