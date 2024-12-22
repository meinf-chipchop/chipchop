from django.core.validators import MaxValueValidator, MinValueValidator
from rest_framework import serializers
from rest_framework_nested.serializers import (
    NestedHyperlinkedModelSerializer,
    NestedHyperlinkedIdentityField,
)
from rest_framework.exceptions import ValidationError

from . import models
from users.models import Address, UserRoles
from users.serializers import UserDetailSerializer


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

    user = UserDetailSerializer()

    deliverer = serializers.HyperlinkedRelatedField(
        view_name="deliverer-detail",
        read_only=True,
    )

    deliverer_id = serializers.IntegerField(source="deliverer.user.id", read_only=True)

    dishes = serializers.HyperlinkedIdentityField(
        view_name="order-dish-list",
        lookup_field="pk",
        lookup_url_kwarg="order_pk",
    )

    dish_count = serializers.SerializerMethodField()

    total_price = serializers.SerializerMethodField()

    address = serializers.CharField()

    class Meta:
        model = models.Order
        fields = [
            "id",
            "user",
            "deliverer",
            "deliverer_id",
            "address",
            "dishes",
            "dish_count",
            "total_price",
            "order_type",
            "order_status",
            "created_at",
            "last_updated",
        ]

    def get_dish_count(self, obj: models.Order):
        return sum([dish.amount for dish in obj.orderdish_set.all()])

    def get_total_price(self, obj: models.Order):
        return sum([dish.price for dish in obj.orderdish_set.all()])


class OrderListSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name="order-detail",
        lookup_field="pk",
        read_only=True,
    )

    dishes = serializers.HyperlinkedIdentityField(
        view_name="order-dish-list",
        lookup_field="pk",
        lookup_url_kwarg="order_pk",
    )

    deliverer = serializers.HyperlinkedRelatedField(
        view_name="deliverer-detail",
        read_only=True,
    )

    first_name = serializers.CharField(source="user.first_name")

    class Meta:
        model = models.Order
        fields = [
            "url",
            "dishes",
            "deliverer",
            "first_name",
            "order_type",
            "order_status",
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
        choices = [c[0] for c in models.Order.OrderStatus.choices]
        old_idx = choices.index(self.instance.order_status)
        new_idx = choices.index(value)

        if new_idx <= old_idx:
            raise ValidationError("New status must move the order forward")

        role = self.context["request"].user.role
        if role == UserRoles.DELIVERER:
            cooked_status_idx = choices.index(models.Order.OrderStatus.COOKED)
            if old_idx < cooked_status_idx:
                raise ValidationError(
                    "Deliverers can't update the status unless the order is cooked"
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


class EmptySerializer(serializers.Serializer):
    pass
