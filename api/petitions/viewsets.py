from rest_framework import viewsets, mixins

from . import models, serializers


class AccountUpgradePetitionViewset(mixins.RetrieveModelMixin, 
                                    mixins.ListModelMixin, 
                                    mixins.UpdateModelMixin,
                                    viewsets.GenericViewSet):
    lookup_field = "user"
    queryset = models.AccountUpgradePetition.objects.all()
    serializer_class = serializers.AccountUpgradePetitionSerializer


