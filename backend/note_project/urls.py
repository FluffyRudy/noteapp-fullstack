from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("note_api.urls")),
    path(
        "api/token/", views.TokenObtainPairView.as_view(), name="access-refresh-token"
    ),
    path("api/token/refresh/", views.TokenRefreshView.as_view(), name="refresh-token"),
]
