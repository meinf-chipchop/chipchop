from django.contrib.auth import get_user_model, authenticate, login, logout

from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework import status

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


class LoginViewSet(viewsets.ViewSet):
    serializer_class = serializers.LoginSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = serializers.LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")

            user = authenticate(request=request, email=email, password=password)
            if user is not None:
                login(request, user)
                return Response(serializers.UserSerializer(user).data)
            return Response(
                {"Message": "Invalid Email and Password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        logout(request)
        response = Response({"Message": "Successfully logged out."}, status=status.HTTP_200_OK)
        response.delete_cookie("Token")
        return response
