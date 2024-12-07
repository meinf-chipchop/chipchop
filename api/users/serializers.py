from django.contrib.auth import get_user_model

from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    EmailField,
    CharField,
    HyperlinkedModelSerializer,
    HyperlinkedIdentityField,
    SerializerMethodField,
)

from users.models import Address
from orders.models import Order

User = get_user_model()


class UserCreationSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "password",
            "phone",
            "birth_date",
        ]
        extra_kwargs = {"password": {"write_only": True}}


class UserListSerializer(HyperlinkedModelSerializer):

    url = HyperlinkedIdentityField(view_name="user-detail")

    total_orders = SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "url",
            "first_name",
            "last_name",
            "email",
            "banned",
            "total_orders",
        ]

    def get_total_orders(self, obj):
        return Order.objects.filter(user=obj).count()


class UserDetailSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "role",
            "phone",
            "birth_date",
            "banned",
        ]

    def create(self, validated_data):
        validated_data.pop("banned", None)  # Remove banned field if present
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Allow updating the banned field
        instance.banned = validated_data.get("banned", instance.banned)
        return super().update(instance, validated_data)


class LoginSerializer(Serializer):
    email = EmailField()
    password = CharField(write_only=True)


class AddressListSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Address
        fields = [
            "url",
            "street",
            "city",
            "zip_code",
            "country_iso2",
        ]


class AddressSerializer(ModelSerializer):

    user = HyperlinkedIdentityField(view_name="user-detail")

    class Meta:
        model = Address
        fields = [
            "user",
            "street",
            "city",
            "zip_code",
            "country_iso2",
        ]
