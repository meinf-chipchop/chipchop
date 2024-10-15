from rest_framework import serializers

from cooks.serializers import CCCookSimpleSerializer
from cooks.models import CCCook

from deliverers.serializers import CCDelivererSimpleSerializer
from deliverers.models import CCDeliverer

from users.serializers import UserSerializer

from . import models


class AccountUpgradePetitionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    info = serializers.SerializerMethodField()

    class Meta:
        model = models.AccountUpgradePetition
        fields = "__all__"

    def get_info(self, obj):
        if CCCook.objects.filter(user=obj.user).exists():
            cook = CCCook.objects.get(user=obj.user)
            return CCCookSimpleSerializer(cook).data

        if CCDeliverer.objects.filter(user=obj.user).exists():
            deliverer = CCDeliverer.objects.get(user=obj.user)
            return CCDelivererSimpleSerializer(deliverer).data

        return {}


class AccountUpgradePetitionListSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name="account-approval-detail")

    class Meta:
        model = models.AccountUpgradePetition
        fields = ["url"]
