from rest_framework.permissions import BasePermission

from . import models

class IsCook(BasePermission):
    def has_permission(self, request, view):
        return models.CCCook.objects.filter(user=request.user).exists()