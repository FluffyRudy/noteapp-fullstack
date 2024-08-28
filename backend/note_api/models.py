from django.db import models


class Note(models.Model):
    title = models.CharField(max_length=100, blank=True, default="")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(
        "auth.User", related_name="notes", on_delete=models.CASCADE
    )
