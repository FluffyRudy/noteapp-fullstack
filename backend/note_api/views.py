from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import permissions


class Home(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"tokens": f"Hello {request.user.username}"})
