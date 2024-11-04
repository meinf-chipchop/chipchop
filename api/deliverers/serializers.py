from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.serializers import UserDetailSerializer, UserCreationSerializer
from users.models import UserRoles

from . import models


User = get_user_model()


class CCDelivererSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CCDeliverer
        exclude = ["user"]


class CCDelivererCreationSerializer(serializers.ModelSerializer):

    user = UserCreationSerializer()

    class Meta:
        model = models.CCDeliverer
        fields = [
            "transport",
            "user",
        ]

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        user = User.objects.create_user(**user_data, role=UserRoles.DELIVERER)
        deliverer = models.CCDeliverer.objects.create(user=user, **validated_data)

        return deliverer


class CCDelivererDetailSerializer(serializers.ModelSerializer):

    user = UserDetailSerializer()

    rating_average = serializers.DecimalField(
        decimal_places=2,
        max_digits=3,
    )

    class Meta:
        model = models.CCDeliverer
        fields = [
            "user",
            "transport",
            "rating_average",
            "rating_count",
        ]


class CCDelivererListSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name="deliverer-detail",
        lookup_field="pk",
    )

    email = serializers.EmailField(source="user.email")

    rating_average = serializers.DecimalField(
        decimal_places=2,
        max_digits=3,
    )

    class Meta:
        model = models.CCDeliverer
        fields = [
            "url",
            "email",
            "rating_average",
            "transport",
        ]
