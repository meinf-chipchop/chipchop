from django.contrib.auth import get_user_model 
from django.shortcuts import render

from rest_framework import viewsets 
from . import serializers

# Create your views here.

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
