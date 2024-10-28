from rest_framework import permissions, mixins, viewsets

from . import models, serializers


class CCCookViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = models.CCCook.objects.all()
    serializer_class = serializers.CCCookDetailSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.CCCookListSerializer

        if self.action == "create":
            return serializers.CCCookCreationSerializer

        return super().get_serializer_class()


class DishViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.DishDetailSerializer
    lookup_field = "pk"

    def get_queryset(self):
        # Get the cook_pk from the URL and only show their dishes
        user = self.kwargs["cook_pk"]
        return models.Dish.objects.filter(user=user)

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.DishListSerializer

        return super().get_serializer_class()
