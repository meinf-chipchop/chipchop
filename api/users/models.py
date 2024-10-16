from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models


class CCUser(AbstractUser):

    class Meta:
        verbose_name_plural = "Chip Chop Users"

    class UserRoles(models.TextChoices):
        USER = ("U", "User")
        COOK = ("C", "Cook")
        DELIVERER = ("D", "Deliverer")

    username = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    age = models.SmallIntegerField()
    role = models.CharField(
        choices=UserRoles.choices, default=UserRoles.USER, max_length=1
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["age", "password"]


User = get_user_model()


class Address(models.Model):

    class Meta:
        verbose_name_plural = "Addresses"
        constraints = [
            models.UniqueConstraint(fields=["id", "user"], name="unique address")
        ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    street = models.CharField()
    zip_code = models.IntegerField()
    city = models.CharField()
    country_iso2 = models.CharField(max_length=2)
