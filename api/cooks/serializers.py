from rest_framework import serializers
from users.serializers import UserSerializer
from users.models import CCCook, CCUser



class CCCookSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CCCook
        fields = [ "public_name", "user", "password"]
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        new_password = validated_data.pop('password')
        user = CCUser.objects.create(**user_data)
        user.set_password(new_password)
        cook = CCCook.objects.create(user=user, **validated_data)
        return cook
