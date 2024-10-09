from django.contrib.auth.models import AbstractUser
from django.db import models




class CCUser(AbstractUser):
    username = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    age = models.SmallIntegerField()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["age", "password"]

    class Meta:
        verbose_name_plural = "Chip Chop Users"

class Address(models.Model):
    class Meta:
        verbose_name_plural = "Addresses"
        constraints = [
        models.UniqueConstraint(fields=['id', 'user'], name='unique address')
    ]
        
    user = models.ForeignKey(CCUser, on_delete=models.CASCADE, null=True)
    street = models.CharField()
    zip_code = models.IntegerField()
    city = models.CharField()
    country_iso2 = models.CharField(max_length=2)


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
    
