from django.contrib.auth.models import AbstractUser
from django.db import models


class Address(models.Model):
    street = models.CharField()
    zip_code = models.IntegerField()
    city = models.CharField()
    country_iso2 = models.CharField(max_length=2)

    class Meta:
        verbose_name_plural = "Addresses"


class CCUser(AbstractUser):
    addresses = models.ManyToOneRel(to=Address, field=Address.pk, field_name="Addresses")
    phone = models.CharField(max_length=15)
    age = models.SmallIntegerField()

    class Meta:
        verbose_name_plural = "Chip Chop Users"


class CCCook(models.Model):
    user = models.OneToOneField(CCUser, primary_key=True, on_delete=models.CASCADE)
    public_name = models.CharField()

    class Meta:
        verbose_name_plural = "Chip Chop Cooks"


class CCDelivery(models.Model):

    class TransportType(models.TextChoices):
        CAR = ("C", "Car")
        BYCICLE = ("B", "Bycicle")
        SCOOTER = ("S", "Scooter")

    user = models.OneToOneField(CCUser, primary_key=True, on_delete=models.CASCADE)
    transport = models.CharField(choices=TransportType.choices, default="W")

    class Meta:
        verbose_name_plural = "Chip Chop Deliveries"
    
