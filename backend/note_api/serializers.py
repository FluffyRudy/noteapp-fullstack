from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    """HyperlinkedIdentityField is for generating url for self instance
    HyperlinkedRelatedField is for generating url for a foreign key related field
    "both of them take retrive view for single instance
    """

    url = serializers.HyperlinkedIdentityField(view_name="note-detail")
    author = serializers.HyperlinkedRelatedField(
        view_name="user-detail", read_only=True
    )

    class Meta:
        model = Note
        fields = ["id", "title", "created_at", "updated_at", "author", "url"]
        extra_kwargs = {"author": {"read_only": True}}


class UserSerializer(serializers.ModelSerializer):
    """
    q-> why override create?
     default behavior is User.objects.create(**validated_data) but
     problem is it doesnt use ay hashing, means it will store data as
     plain text without hashing which is major security issue.
     But calling create_user will hash, and it comes from BaseUserManager class
    """

    # add hyperlink related filed to give links of notes associated with user
    notes = serializers.HyperlinkedRelatedField(
        many=True, view_name="note-detail", read_only=True
    )

    class Meta:
        model = User
        fields = ["id", "username", "password", "confirm_password", "notes"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
