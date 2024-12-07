from rest_framework import permissions, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models, serializers

from ratings.models import DeliveryRating
from ratings.serializers import DeliveryRatingDetailSerializer


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

    @action(detail=True, methods=["GET"])
    def ratings(self, request, pk=None):
        deliverer = self.get_object()
        ratings = DeliveryRating.objects.filter(order__deliverer=deliverer)
        serializer = DeliveryRatingDetailSerializer(ratings, many=True)
        return Response(serializer.data)
