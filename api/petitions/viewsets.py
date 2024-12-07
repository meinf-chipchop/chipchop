from rest_framework import viewsets, mixins

from . import models, serializers


class AccountUpgradePetitionViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = serializers.AccountUpgradePetitionSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Check if the user is an admin
            return models.AccountUpgradePetition.objects.all()
        else:
            return models.AccountUpgradePetition.objects.filter(user=user)

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.AccountUpgradePetitionListSerializer

        return super().get_serializer_class()
