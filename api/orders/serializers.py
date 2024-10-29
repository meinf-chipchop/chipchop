from django.core.validators import MaxValueValidator, MinValueValidator
from rest_framework import serializers
from rest_framework_nested.serializers import (
    NestedHyperlinkedModelSerializer,
    NestedHyperlinkedIdentityField,
    NestedHyperlinkedRelatedField,
)

from . import models, validators
from users.models import Address
from deliverers.models import CCDeliverer


class OrderDishCreationSerializer(serializers.ModelSerializer):

    dish = serializers.PrimaryKeyRelatedField(
        queryset=models.Dish.objects.all(),
    )

    amount = serializers.IntegerField(
        default=1,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(1000),
        ],
    )

    note = serializers.CharField(
        allow_blank=True,
    )

    class Meta:
        model = models.OrderDish
        fields = ["dish", "amount", "note"]

    def create(self, validated_data):
        order_id = self.context["request"].parser_context["kwargs"]["order_pk"]

        validated_data["order"] = models.Order.objects.get(
            pk=order_id,
        )
        validated_data["price"] = (
            validated_data["dish"].price * validated_data["amount"]
        )

        order_dish = models.OrderDish.objects.create(**validated_data)
        return order_dish


class OrderDishDetailSerializer(serializers.ModelSerializer):

    order = serializers.HyperlinkedRelatedField(
        view_name="order-detail",
        lookup_field="pk",
        read_only=True,
    )

    dish = NestedHyperlinkedIdentityField(
        view_name="dish-detail",
        parent_lookup_kwargs={
            "cook_pk": "dish__user__pk",
            "pk": "dish__pk",
        },
        read_only=True,
    )

    amount = serializers.IntegerField()

    price = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
    )

    note = serializers.CharField()

    class Meta:
        model = models.OrderDish
        fields = [
            "order",
            "dish",
            "amount",
            "price",
            "note",
        ]


class OrderDishListSerializer(NestedHyperlinkedModelSerializer):

    url = NestedHyperlinkedIdentityField(
        view_name="order-dish-detail",
        parent_lookup_kwargs={"order_pk": "order__pk"},
    )

    class Meta:
        model = models.OrderDish
        fields = [
            "url",
        ]


class OrderDetailSerializer(serializers.ModelSerializer):

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

    dishes = serializers.HyperlinkedRelatedField(
        view_name="order-dish-list",
        lookup_field="pk",
        lookup_url_kwarg="order_pk",
        read_only=True,
    )

    address = serializers.HyperlinkedRelatedField(
        view_name="address-detail",
        lookup_field="pk",
        read_only=True,
    )

    class Meta:
        model = models.Order
        fields = [
            "user",
            "deliverer",
            "address",
            "dishes",
            "order_type",
            "order_status",
            "created_at",
        ]

    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer, self).__init__(*args, **kwargs)

        if self.context["request"].method == "PUT":
            self.fields["address"] = serializers.PrimaryKeyRelatedField(
                queryset=Address.objects.filter(user=self.context["request"].user),
            )


class OrderListSerializer(serializers.HyperlinkedModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name="order-detail",
        lookup_field="pk",
        read_only=True,
    )

    class Meta:
        model = models.Order
        fields = [
            "url",
        ]


class OrderCreationSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name="order-detail",
        read_only=True,
    )

    deliverer = serializers.HyperlinkedRelatedField(
        view_name="deliverer-detail",
        queryset=CCDeliverer.objects.all(),
    )

    address = serializers.HyperlinkedRelatedField(
        view_name="address-detail",
        queryset=Address.objects.all(),
    )

    class Meta:
        model = models.Order
        fields = [
            "url",
            "deliverer",
            "order_type",
            "address",
        ]
        # validators = [validators.OrderCreationValidator]

    # def validate_deliverer(self, value):
    #     if self.order_type == models.Order.OrderType.DELIVERY and not value:
    #         raise serializers.ValidationError(
    #             "Deliverer must be provided for delivery orders"
    #         )
    #     if self.order_type == models.Order.OrderType.PICKUP:
    #         return None

    # def validate_address(self, value):
    #     value.user = self.context["request"].user
    #     if value.user != models.Address.objects.get(pk=value.pk).user:
    #         raise serializers.ValidationError("Address does not belong to user")
    #     if self.order_type == models.Order.OrderType.PICKUP:
    #         return None

    def __init__(self, *args, **kwargs):
        super(OrderCreationSerializer, self).__init__(*args, **kwargs)

        self.fields["address"] = serializers.HyperlinkedRelatedField(
            view_name="address-detail",
            queryset=Address.objects.filter(user=self.context["request"].user),
        )
