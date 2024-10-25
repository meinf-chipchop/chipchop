from django.contrib.auth import get_user_model

from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    EmailField,
    CharField,
    HyperlinkedModelSerializer,
)

from users.models import Address

User = get_user_model()


class UserCreationSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "password", "phone", "age"]
        extra_kwargs = {"password": {"write_only": True}}


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "role", "phone", "age"]


class LoginSerializer(Serializer):
    email = EmailField()
    password = CharField(write_only=True)


class AddressListSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Address
        fields = [
            "url",
        ]


class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"
