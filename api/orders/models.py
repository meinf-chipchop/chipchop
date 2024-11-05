from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

from cooks.models import Dish
from users.models import Address, UserRoles
from deliverers.models import CCDeliverer


User = get_user_model()


class Order(models.Model):

    class CookStatus(models.TextChoices):
        APPROVED = ("A", "Approved")
        REJECTED = ("R", "Rejected")
        COOKING = ("C", "Cooking")
        COOKED = ("K", "Cooked")
        BURNT_KITCHEN = ("B", "Burnt Kitchen")

    class DelivererStatus(models.TextChoices):
        DELIVERING = ("D", "Delivering")
        FINISHED = ("F", "Finished")
        TRAFFIC_ACCIENT = ("T", "Traffic Accident")
        SEGARRO_AMIGO = ("S", "Atracao")

    class OrderStatus(models.TextChoices):
        # ORDER STATUS -- STATUS INDEX ORDER IS IMPORTANT, DO NOT CHANGE
        PENDING = ("P", "Pending")
        APPROVED = ("A", "Approved")
        COOKING = ("C", "Cooking")
        BURNT_KITCHEN = ("B", "Burnt Kitchen")
        COOKED = ("K", "Cooked")

        DELIVERING = ("D", "Delivering")
        TRAFFIC_ACCIENT = ("T", "Traffic Accident")
        SEGARRO_AMIGO = ("S", "Atracao")
        FINISHED = ("F", "Finished")
        REJECTED = ("R", "Rejected")

    class OrderType(models.TextChoices):
        DELIVERY = ("D", "Delivery")
        PICKUP = ("P", "Pickup")

    class Meta:
        verbose_name_plural = "Orders"
        constraints = [
            models.UniqueConstraint(
                fields=["id", "user"],
                name="unique_order__id_user",
            ),
        ]

    user = models.ForeignKey(
        User,
        null=False,
        on_delete=models.CASCADE,
    )

    deliverer = models.ForeignKey(
        CCDeliverer,
        null=True,
        on_delete=models.SET_NULL,
    )

    order_type = models.CharField(
        choices=OrderType.choices,
        default=OrderType.PICKUP,
        max_length=1,
    )

    order_status = models.CharField(
        choices=OrderStatus.choices,
        default=OrderStatus.PENDING,
        max_length=1,
    )

    created_at = models.DateTimeField(
        editable=False,
    )

    last_updated = models.DateTimeField(
        editable=False,
        default=timezone.now,
    )

    address = models.ForeignKey(
        Address,
        on_delete=models.DO_NOTHING,
        null=True,
        default=None,
    )

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        self.last_updated = timezone.now()
        return super(Order, self).save(*args, **kwargs)

    @classmethod
    def get_status_choices(cls, role: UserRoles):
        if role == UserRoles.COOK:
            return cls.CookStatus.choices

        if role == UserRoles.DELIVERER:
            return cls.DelivererStatus.choices

        return []


class OrderDish(models.Model):

    class Meta:
        verbose_name_plural = "Order Dishes"
        constraints = [
            models.CheckConstraint(
                check=models.Q(amount__gte=1) & models.Q(amount__lt=1000),
                name="Order Dish amount must be between 1 and 1000",
            )
        ]

    order = models.ForeignKey(
        Order,
        null=False,
        on_delete=models.CASCADE,
    )
    dish = models.ForeignKey(
        Dish,
        null=False,
        on_delete=models.CASCADE,
    )

    price = models.DecimalField(
        default=0,
        max_digits=6,
        decimal_places=2,
    )
    amount = models.IntegerField(
        default=1,
    )
    note = models.TextField(
        max_length=300,
    )
