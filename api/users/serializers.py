from django.contrib.auth import get_user_model

from rest_framework.serializers import ModelSerializer, Serializer, EmailField, CharField


User = get_user_model()


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "role", "phone", "age"]
        
        

class LoginSerializer(Serializer):
    email = EmailField()
    password = CharField(write_only=True)

    fields = ["first_name", "last_name", "email", "phone", "age"]

