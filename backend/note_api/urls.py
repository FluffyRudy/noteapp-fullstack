from django.urls import path
from . import views

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("api/notes/", views.NoteList.as_view(), name="create-list-notes"),
    path("api/notes/<int:pk>/", views.NoteDetail.as_view(), name="note-detail"),
    path("api/user/<int:pk>/", views.UserDetail.as_view(), name="user-detail"),
    path("api/user/create/", views.UserCreation.as_view(), name="create-user"),
]
