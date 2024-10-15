from rest_framework import serializers

from rest_framework_nested.serializers import NestedHyperlinkedModelSerializer
from rest_framework_nested.relations import NestedHyperlinkedIdentityField

from petitions.models import AccountUpgradePetition
from users.serializers import UserSerializer
from users.models import CCCook, CCUser

from . import models


class CCCookSimpleSerializer(serializers.ModelSerializer):
        class Meta:
            model = CCCook
            exclude = ["user"]

class CCCookDetailSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    password = serializers.CharField(write_only=True)

    # debug only?
    dishes = serializers.HyperlinkedIdentityField(view_name='dish-list', lookup_field="pk", lookup_url_kwarg="cook_pk")

    class Meta:
        model = CCCook
        fields = ["public_name", "user", "password", "dishes"]
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        new_password = validated_data.pop('password')
        user = CCUser.objects.create(**user_data, role=CCUser.COOK)
        user.set_password(new_password)
        cook = CCCook.objects.create(user=user, **validated_data)

        # Create user petition
        AccountUpgradePetition.objects.create(user=user) 
        
        return cook
    

class CCCookListSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name="cook-detail", lookup_field="pk")

    class Meta:
        model = CCCook
        fields = ["url"]


class DishListSerializer(NestedHyperlinkedModelSerializer):

    url = NestedHyperlinkedIdentityField(view_name="dish-detail", parent_lookup_kwargs={"cook_pk": "user__pk"})
    
    class Meta:
        model = models.Dish
        fields = ["url", "name", "description", "category", "price", "discount", "created_at", "last_update_at"]

class DishDetailSerializer(NestedHyperlinkedModelSerializer):

    class Meta:
        model = models.Dish
        fields = ["name", "description", "category", "price", "discount", "created_at", "last_update_at"]        
