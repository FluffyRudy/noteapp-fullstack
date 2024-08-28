from django.urls import path
from . import views

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("api/notes/", views.NotesList.as_view(), name="note-list"),
    path("api/notes/create/", views.NoteCreate.as_view(), name="create-note"),
    path("api/notes/<int:pk>/", views.NoteDetail.as_view(), name="note-detail"),
    path("api/user/<int:pk>/", views.UserDetail.as_view(), name="user-detail"),
    path("api/user/create/", views.UserCreate.as_view(), name="create-user"),
]
