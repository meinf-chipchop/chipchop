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

    def __str__(self) -> str:
        return str(self.user)
