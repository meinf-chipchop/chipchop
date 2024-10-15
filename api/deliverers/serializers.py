from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.serializers import UserSerializer
from petitions.models import AccountUpgradePetition

from . import models


User = get_user_model()


class CCDelivererDetailSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = models.CCDeliverer
        fields = ["user", "password", "transport"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        new_password = validated_data.pop("password")

        user = User.objects.create(**user_data, role=User.UserRoles.DELIVERER)
        cook = models.CCDeliverer.objects.create(user=user, **validated_data)

        user.set_password(new_password)

        AccountUpgradePetition.objects.create(user=user)

        return cook


class CCDelivererListSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name="deliverer-detail", lookup_field="pk"
    )

    class Meta:
        model = models.CCDeliverer
        fields = ["url"]
