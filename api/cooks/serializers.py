from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework_nested.serializers import NestedHyperlinkedModelSerializer
from rest_framework_nested.relations import NestedHyperlinkedIdentityField

from users.serializers import UserDetailSerializer, UserCreationSerializer
from users.models import UserRoles

from . import models

User = get_user_model()


class CCCookSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CCCook
        exclude = ["user"]


class CCCookCreationSerializer(serializers.ModelSerializer):

    user = UserCreationSerializer()

    class Meta:
        model = models.CCCook
        fields = ["public_name", "user"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        user = User.objects.create_user(**user_data, role=UserRoles.COOK)
        cook = models.CCCook.objects.create(user=user, **validated_data)

        return cook


class CCCookDetailSerializer(serializers.ModelSerializer):

    user = UserDetailSerializer()
    dishes = serializers.HyperlinkedIdentityField(
        view_name="dish-list",
        lookup_field="pk",
        lookup_url_kwarg="cook_pk",
    )

    class Meta:
        model = models.CCCook
        fields = ["public_name", "user", "dishes"]


class CCCookListSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name="cook-detail", lookup_field="pk"
    )

    class Meta:
        model = models.CCCook
        fields = [
            "url",
            "public_name",
        ]


class DishListSerializer(NestedHyperlinkedModelSerializer):

    url = NestedHyperlinkedIdentityField(
        view_name="dish-detail",
        parent_lookup_kwargs={"cook_pk": "user__pk"},
    )

    category = serializers.HyperlinkedRelatedField(
        view_name="dish-category-detail",
        read_only=True,
    )

    class Meta:
        model = models.Dish
        fields = [
            "url",
            "name",
            "description",
            "category",
            "price",
            "discount",
            "image_url",
            "estimated_time",
            "created_at",
            "last_update_at",
        ]


class DishDetailSerializer(serializers.ModelSerializer):

    category = serializers.SerializerMethodField()

    class Meta:
        model = models.Dish
        fields = [
            "name",
            "description",
            "category",
            "image_url",
            "rating_average",
            "rating_count",
            "estimated_time",
            "price",
            "discount",
            "created_at",
            "last_update_at",
        ]

    def create(self, validated_data):
        user_id = self.context["request"].parser_context["kwargs"]["cook_pk"]
        user = models.CCCook.objects.get(pk=user_id)
        return models.Dish.objects.create(
            user=user,
            **validated_data,
        )

    def get_category(self, obj):
        return obj.category.name


class DishCategoryDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.DishCategory
        fields = [
            "name",
            "image_url",
        ]


class DishCategoryListSerializer(serializers.HyperlinkedModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name="dish-category-detail",
    )

    class Meta:
        model = models.DishCategory
        fields = [
            "url",
            "name",
            "image_url",
        ]


class DishRatingSerializer(serializers.ModelSerializer):

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
