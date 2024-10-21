from rest_framework import permissions, mixins, viewsets

from . import models, serializers


class CCDelivererViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = models.CCDeliverer.objects.all()
    serializer_class = serializers.CCDelivererDetailSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.CCDelivererListSerializer

        if self.action == "create":
            return serializers.CCDelivererCreationSerializer

        return super().get_serializer_class()
