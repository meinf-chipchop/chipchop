from ratings.models import DishRating, DeliveryRating

from django.db import models


def get_cooks_rating_average(cook):
    return DishRating.objects.filter(dish__user=cook).aggregate(models.Avg("rating"))[
        "rating__avg"
    ]


def get_cooks_rating_count(cook):
    return DishRating.objects.filter(dish__user=cook).count()


def get_dish_rating_count(dish):
    return DishRating.objects.filter(dish=dish).count()


def get_dish_rating_average(dish):
    return DishRating.objects.filter(dish=dish).aggregate(models.Avg("rating"))[
        "rating__avg"
    ]


def get_deliverer_rating_count(deliverer):
    return DeliveryRating.objects.filter(order__deliverer=deliverer).count()


def get_deliverer_rating_avg(deliverer):
    return DeliveryRating.objects.filter(order__deliverer=deliverer).aggregate(
        models.Avg("rating")
    )["rating__avg"]
