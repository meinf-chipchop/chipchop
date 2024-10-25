from rest_framework import serializers

from . import models

from users.serializers import AddressListSerializer
from users.models import Address

from deliverers.models import CCDeliverer


class OrderDetailSerializer(serializers.HyperlinkedModelSerializer):

    user = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        lookup_field="pk",
        read_only=True,
    )

    deliverer = serializers.HyperlinkedRelatedField(
        view_name="deliverer-detail",
        lookup_field="pk",
        read_only=True,
    )

    class Meta:
        model = models.Order
        fields = [
            "user",
            "deliverer",
            "order_type",
            "order_status",
            "created_at",
        ]


class OrderListSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name="order-detail",
        lookup_field="pk",
    )

    class Meta:
        model = models.Order
        fields = [
            "url",
        ]


class OrderCreationSerializer(serializers.ModelSerializer):

    deliverer = serializers.HyperlinkedRelatedField(
        view_name="deliverer-detail",
        lookup_field="pk",
        queryset=CCDeliverer.objects.all(),
    )

    address = serializers.HyperlinkedRelatedField()

    class Meta:
        model = models.Order
        fields = [
            "deliverer",
            "order_type",
            "address",
        ]

    def create(self, validated_data):
        if validated_data.get("order_type") == models.Order.OrderType.DELIVERY:
            assert (
                validated_data.get("deliverer") is not None
            ), "Deliverer must be provided for delivery orders"
            assert (
                validated_data.get("address") is not None
            ), "Address must be provided for delivery orders"

        validated_data["user"] = self.context["request"].user
        return models.Order.objects.create(**validated_data)

    def get_address(self, obj):
        return AddressListSerializer(
            Address.objects.filter(user=self.context["request"].user)
        ).data
