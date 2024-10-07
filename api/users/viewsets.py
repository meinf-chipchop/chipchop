from django.contrib.auth import get_user_model 

from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken.serializers import AuthTokenSerializer

from rest_framework.permissions import AllowAny

from rest_framework import viewsets
from . import serializers

# Create your views here.

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer



class TokenViewSet(viewsets.ViewSet):
    serializer_class = AuthTokenSerializer

    permission_classes = [AllowAny]

    def create(self, request):
        response = obtain_auth_token(request._request)

        token = response.data["token"]

        response.set_cookie(key="Token", value=token)
        return response