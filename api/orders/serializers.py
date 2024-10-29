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


class OrderUpdateSerializer(serializers.ModelSerializer):

    order_status = serializers.ChoiceField(
        choices=models.Order.OrderStatus.choices,
    )

    class Meta:
        model = models.Order
        fields = [
            "order_status",
        ]

    def __init__(self, *args, **kwargs):
        super(OrderUpdateSerializer, self).__init__(*args, **kwargs)

        self.fields["order_status"] = serializers.ChoiceField(
            choices=models.Order.get_status_choices(self.context["request"].user.role),
        )

    def validate_order_status(self, value):
        if (
            value in [c[0] for c in models.Order.DelivererStatus.choices]
            and self.instance.order_status != models.Order.OrderStatus.COOKED
        ):
            raise serializers.ValidationError(
                "Cannot set deliverer status without order being cooked"
            )

        choices = [c[0] for c in models.Order.OrderStatus.choices]

        old_idx = choices.index(self.instance.order_status)
        new_idx = choices.index(value)

        if new_idx < old_idx:
            raise serializers.ValidationError(
                "Cannot set order status to a previous state"
            )

        return value


class OrderCreationSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name="order-detail",
        read_only=True,
    )

    address = serializers.HyperlinkedRelatedField(
        view_name="address-detail",
        queryset=Address.objects.all(),
    )

    class Meta:
        model = models.Order
        fields = [
            "url",
            "order_type",
            "address",
        ]

    def __init__(self, *args, **kwargs):
        super(OrderCreationSerializer, self).__init__(*args, **kwargs)

        self.fields["address"] = serializers.HyperlinkedRelatedField(
            view_name="address-detail",
            queryset=Address.objects.filter(user=self.context["request"].user),
        )
