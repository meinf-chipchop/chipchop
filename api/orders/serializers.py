from rest_framework import serializers

from . import models

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
            "address",
            "created_at",
        ]

    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer, self).__init__(*args, **kwargs)

        if self.context["request"].method == "PUT":
            self.fields["address"] = serializers.PrimaryKeyRelatedField(
                queryset=Address.objects.filter(user=self.context["request"].user),
            )


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

    url = serializers.HyperlinkedIdentityField(
        view_name="order-detail",
        lookup_field="pk",
        read_only=True,
    )

    deliverer = serializers.HyperlinkedRelatedField(
        view_name="deliverer-detail",
        lookup_field="pk",
        queryset=CCDeliverer.objects.all(),
    )

    address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())

    class Meta:
        model = models.Order
        fields = [
            "url",
            "deliverer",
            "order_type",
            "address",
        ]

    def create(self, validated_data):

        order_type = validated_data.get("order_type")

        if order_type == models.Order.OrderType.DELIVERY:
            try:
                assert (
                    validated_data.get("deliverer") is not None
                ), "Deliverer must be provided for delivery orders"
                assert (
                    validated_data.get("address") is not None
                ), "Address must be provided for delivery orders"
            except Exception as e:
                raise serializers.ValidationError(e)

        if order_type == models.Order.OrderType.PICKUP:
            validated_data["deliverer"] = None
            validated_data["address"] = None

        if validated_data.get("address"):
            address = validated_data["address"]
            if address.user != self.context["request"].user:
                raise serializers.ValidationError("Address does not belong to user")

        validated_data["user"] = self.context["request"].user
        return models.Order.objects.create(**validated_data)

    def __init__(self, *args, **kwargs):
        super(OrderCreationSerializer, self).__init__(*args, **kwargs)

        self.fields["address"] = serializers.PrimaryKeyRelatedField(
            queryset=Address.objects.filter(user=self.context["request"].user),
        )
