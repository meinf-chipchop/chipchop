from rest_framework import serializers

from . import models

from users.serializers import UserSerializer

class AccountUpgradePetitionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = models.AccountUpgradePetition
        fields = "__all__"

