from rest_framework import serializers
from django.core.validators import MinValueValidator, MaxValueValidator

from . import models


class DishRatingSerializer(serializers.ModelSerializer):

    rating = serializers.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(5.0),
        ],
    )

    class Meta:
        model = models.DishRating
        fields = ["rating"]

    def create(self, validated_data):
        dish = self.context["view"].get_object()
        user = self.context["request"].user
        return models.DishRating.objects.create(
            dish=dish,
            user=user,
            **validated_data,
        )


class DeliveryRatingSerializer(serializers.ModelSerializer):

    rating = serializers.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(5.0),
        ],
    )

    class Meta:
        model = models.DeliveryRating
        fields = [
            "rating",
            "note",
        ]
