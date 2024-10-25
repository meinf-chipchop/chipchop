from rest_framework import viewsets, mixins

from . import models, serializers


class OrderViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        return models.Order.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.OrderListSerializer

        if self.action == "create":
            return serializers.OrderCreationSerializer

        return super().get_serializer_class()
