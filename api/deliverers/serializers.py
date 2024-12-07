from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.serializers import UserDetailSerializer, UserCreationSerializer
from users.models import UserRoles
from ratings.utils import get_deliverer_rating_avg, get_deliverer_rating_count

from . import models


User = get_user_model()


class CCDelivererSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CCDeliverer
        exclude = ["user"]


class CCDelivererCreationSerializer(serializers.ModelSerializer):

    user = UserCreationSerializer()

    class Meta:
        model = models.CCDeliverer
        fields = [
            "transport",
            "user",
        ]

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        user = User.objects.create_user(**user_data, role=UserRoles.DELIVERER)
        deliverer = models.CCDeliverer.objects.create(user=user, **validated_data)

        return deliverer


class CCDelivererDetailSerializer(serializers.ModelSerializer):

    user = UserDetailSerializer()

    rating_average = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()

    class Meta:
        model = models.CCDeliverer
        fields = [
            "user",
            "transport",
            "rating_average",
            "rating_count",
        ]

    def get_rating_average(self, obj):
        return get_deliverer_rating_avg(obj)

    def get_rating_count(self, obj):
        return get_deliverer_rating_count(obj)


class CCDelivererListSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name="deliverer-detail",
        lookup_field="pk",
    )

    email = serializers.EmailField(source="user.email")

    rating_average = serializers.SerializerMethodField()

    class Meta:
        model = models.CCDeliverer
        fields = [
            "url",
            "email",
            "transport",
            "rating_average",
        ]

    def get_rating_average(self, obj):
        return get_deliverer_rating_avg(obj)
