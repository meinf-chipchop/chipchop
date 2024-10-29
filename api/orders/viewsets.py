from rest_framework import viewsets, mixins

from . import models, serializers


class OrderDishesViewSet(viewsets.ModelViewSet):
    queryset = models.OrderDish.objects.all()
    serializer_class = serializers.OrderDishDetailSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return serializers.OrderDishCreationSerializer

        if self.action == "list":
            return serializers.OrderDishListSerializer

        return super().get_serializer_class()

    def get_queryset(self):
        order = self.kwargs["order_pk"]
        return models.OrderDish.objects.filter(order=order)


class OrderViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        return models.Order.objects.filter(
            user=self.request.user,
        )

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.OrderListSerializer

        if self.action == "create":
            return serializers.OrderCreationSerializer

        return super(OrderViewSet, self).get_serializer_class()