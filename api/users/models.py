from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.auth.models import UserManager


class UserRoles(models.TextChoices):
    USER = ("U", "User")
    COOK = ("C", "Cook")
    DELIVERER = ("D", "Deliverer")


class CCUserManager(UserManager):

    def create_user(self, **kwargs):

        from petitions.models import AccountUpgradePetition

        role_in_kwargs = "role" in kwargs
        if not role_in_kwargs:
            kwargs["role"] = UserRoles.USER

        kwargs["username"] = kwargs["first_name"]

        user = super().create_user(**kwargs)

        if role_in_kwargs:
            AccountUpgradePetition.objects.create(user=user).save()

        return user


class CCUser(AbstractUser):

    class Meta:
        verbose_name_plural = "Chip Chop Users"

    username = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    banned = models.BooleanField(default=False)
    role = models.CharField(
        choices=UserRoles.choices, default=UserRoles.USER, max_length=1
    )

    objects = CCUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["birth_date", "password"]

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"


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

    def __str__(self) -> str:
        return f"{self.street}, {self.zip_code} {self.city}, {self.country_iso2}"
