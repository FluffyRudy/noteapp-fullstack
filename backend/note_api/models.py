from django.db import models


class Note(models.Model):
    title = models.CharField(max_length=50, blank=True, default="")
    content = models.TextField(max_length=1000)
    author = models.ForeignKey(
        "auth.User", related_name="notes", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
