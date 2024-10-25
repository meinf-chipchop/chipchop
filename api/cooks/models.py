from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


User = get_user_model()


class CCCook(models.Model):

    class Meta:
        verbose_name_plural = "Chip Chop Cooks"

    user = models.OneToOneField(
        User,
        primary_key=True,
        on_delete=models.CASCADE,
    )

    public_name = models.CharField()

    def __str__(self) -> str:
        return str(self.public_name)


class DishCategory(models.Model):

    class Meta:
        verbose_name_plural = "Dish Categories"

    name = models.CharField(
        max_length=50,
        null=False,
        unique=True,
    )


class Dish(models.Model):

    class Meta:
        verbose_name_plural = "Dishes"

    user = models.ForeignKey(
        CCCook,
        on_delete=models.CASCADE,
    )

    name = models.CharField(
        max_length=50,
        null=False,
    )
    description = models.TextField(
        null=False,
    )
    category = models.ForeignKey(
        DishCategory,
        null=True,
        on_delete=models.SET_NULL,
    )
    price = models.DecimalField(
        null=False,
        max_digits=6,
        decimal_places=2,
    )
    discount = models.DecimalField(
        null=False,
        max_digits=5,
        decimal_places=2,
        default=0,
    )

    hidden = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        editable=False,
    )
    last_update_at = models.DateTimeField(
        editable=False,
        null=True,
    )

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = timezone.now()
        self.last_update_at = timezone.now()
        return super(Dish, self).save(*args, **kwargs)
