from django.contrib.auth.models import AbstractUser
from django.db import models

from enum import Enum


class Address(models.Model):
    street = models.CharField()
    zip_code = models.IntegerField()
    city = models.CharField()
    country_iso2 = models.CharField(max_length=2)


class CCUser(AbstractUser):
    addresses = models.ManyToOneRel(to=Address, field=Address.pk, field_name="Addresses")
    phone = models.CharField(max_length=15)
    age = models.SmallIntegerField()


class CCCook(models.Model):
    public_name = models.CharField()


class CCDelivery(models.Model):

    class TransportType(models.TextChoices):
        CAR = ("C", "Car")
        BYCICLE = ("B", "Bycicle")
        SCOOTER = ("S", "Scooter")
        WALKING = ("W", "Walking")

    transport = models.CharField(choices=TransportType.choices, default="W")
    