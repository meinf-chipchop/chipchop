from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

from deliverers.models import CCDeliverer
from cooks.models import Dish


User = get_user_model()


class Order(models.Model):

    class OrderStatus(models.TextChoices):
        PENDING = ("P", "Pending")
        APPROVED = ("A", "Approved")
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
    # TODO: Make deliver request??
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

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        return super(Order, self).save(*args, **kwargs)


class OrderDish(models.Model):

    class Meta:
        verbose_name_plural = "Order Dishes"

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
