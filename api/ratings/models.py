from django.db import models
from django.utils import timezone
from django.core import validators
from django.contrib.auth import get_user_model

from orders.models import Order
from cooks.models import Dish

User = get_user_model()


class DeliveryRating(models.Model):

    class Meta:
        verbose_name_plural = "Order Delivery Ratings"

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
    )

    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        null=False,
        validators=[
            validators.MinValueValidator(1),
            validators.MaxValueValidator(5),
        ],
    )

    note = models.TextField(
        max_length=300,
        blank=True,
        default="",
    )

    created_at = models.DateTimeField(
        editable=False,
    )

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = timezone.now()
        return super(DeliveryRating, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order}: {self.rating}"


class DishRating(models.Model):

    class Meta:
        verbose_name_plural = "Dish Ratings"

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=False,
    )

    dish = models.ForeignKey(
        Dish,
        on_delete=models.CASCADE,
        null=False,
    )

    rating = models.DecimalField(
        decimal_places=2,
        max_digits=3,
        null=False,
        validators=[
            validators.MinValueValidator(1),
            validators.MaxValueValidator(5),
        ],
    )

    def __str__(self) -> str:
        return f"{self.user}: {self.dish} [{self.rating}]"
