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
        fields = ["url"]


class DishListSerializer(NestedHyperlinkedModelSerializer):

    url = NestedHyperlinkedIdentityField(
        view_name="dish-detail",
        parent_lookup_kwargs={"cook_pk": "user__pk"},
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
            "created_at",
            "last_update_at",
        ]


class DishDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Dish
        fields = [
            "name",
            "description",
            "category",
            "price",
            "discount",
            "created_at",
            "last_update_at",
        ]

    def create(self, validated_data):
        user_id = self.context["request"].parser_context["kwargs"]["cook_pk"]
        user = models.CCCook.objects.get(pk=user_id)
        return models.Dish.objects.create(user=user, **validated_data)


class DishCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.DishCategory
        fields = "__all__"
