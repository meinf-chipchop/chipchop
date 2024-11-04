from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class CCDeliverer(models.Model):

    class Meta:
        verbose_name_plural = "Chip Chop Deliverers"

    class TransportType(models.TextChoices):
        CAR = ("C", "Car")
        BICYCLE = ("B", "Bicycle")
        SCOOTER = ("S", "Scooter")

    user = models.OneToOneField(
        User,
        primary_key=True,
        on_delete=models.CASCADE,
    )

    transport = models.CharField(
        choices=TransportType.choices,
        default=TransportType.CAR,
        max_length=1,
    )

    def _get_order_rating_count(self):
        from orders.models import OrderDeliveryRating

        return OrderDeliveryRating.objects.filter(order__deliverer=self).count()

    rating_count = property(_get_order_rating_count)

    def _get_order_rating_avg(self):
        from orders.models import OrderDeliveryRating

        return OrderDeliveryRating.objects.filter(order__deliverer=self).aggregate(
            models.Avg("rating")
        )["rating__avg"]

    rating_average = property(_get_order_rating_avg)

    def __str__(self) -> str:
        return str(self.user)
