from django.contrib.auth import get_user_model, authenticate, login, logout
from django.middleware import csrf

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, viewsets

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action

from petitions.models import AccountUpgradePetition
from orders.serializers import OrderListSerializer
from orders.models import Order
from . import serializers, models


User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserDetailSerializer
   
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.UserListSerializer

        if self.action == "create":
            return serializers.UserCreationSerializer

        return super().get_serializer_class()

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        return User.objects.create_user(**serializer.validated_data)

    @action(detail=False, methods=["get"])
    def me(self, request):
        return Response(self.serializer_class(request.user).data)

    @action(detail=True, methods=["get"])
    def orders(self, request, pk=None):
        user = self.get_object()
        orders = Order.objects.filter(user=user)
        serializer = OrderListSerializer(
            orders, many=True, context={"request": request}
        )
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        # If banned is being updated, check if the user is an admin
        if "banned" in request.data and not request.user.is_staff:
            return Response(
                {"Message": "You are not authorized to ban users."},
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().update(request, *args, **kwargs)


class TokenViewSet(viewsets.ViewSet):
    serializer_class = serializers.LoginSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = serializers.LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")

            user = authenticate(request=request, email=email, password=password)
            if user is not None:
                token, _ = Token.objects.get_or_create(user=user)
                return Response(token.key)
            return Response(
                {"Message": "Invalid Email and Password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
                if not user.is_staff:
                    if user.banned:
                        return Response(
                            {"Message": "Your account is banned."},
                            status=status.HTTP_403_FORBIDDEN,
                        )
                    
                    if AccountUpgradePetition.objects.filter(user=user).exists():
                        if AccountUpgradePetition.objects.get(user=user).state != AccountUpgradePetition.PetitionState.ACCEPTED:
                            return Response(
                                {"Message": "Your account is not accepted yet."},
                                status=status.HTTP_403_FORBIDDEN,
                            )
                
                login(request, user)
                response_data = serializers.UserDetailSerializer(user).data
                csrf_token = csrf.get_token(request)
                response_data['csrf_token'] = csrf_token

                response = Response(response_data)
                return response
            return Response(
                {"Message": "Invalid Email and Password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AddressSerializer
    permission_classes = [IsAuthenticated]
    queryset = models.Address.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.AddressListSerializer

        return super().get_serializer_class()

    # def get_queryset(self):
    #     return self.queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
