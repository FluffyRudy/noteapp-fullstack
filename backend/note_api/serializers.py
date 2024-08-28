from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class NoteSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "updated_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
