from rest_framework.permissions import BasePermission

from cooks.models import CCCook
from deliverers.models import CCDeliverer


class IsCook(BasePermission):
    def has_permission(self, request, view):
        return CCCook.objects.filter(user=request.user).exists()


class IsDeliverer(BasePermission):
    def has_permission(self, request, view):
        return CCDeliverer.objects.filter(user=request.user).exists()
