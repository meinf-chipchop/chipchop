from rest_framework import permissions, mixins, viewsets, exceptions
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models, serializers

from ratings.serializers import DishRatingSerializer
from ratings.models import DishRating
from orders.models import OrderDish


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

        if self.action == "rate":
            return DishRatingSerializer

        if self.action == "create":
            return serializers.DishCreationSerializer

        return super().get_serializer_class()

    @action(detail=True, methods=["post"])
    def rate(self, request, *args, **kwargs):
        dish = self.get_object()
        rating = request.data.get("rating")
        user = request.user

        if not OrderDish.objects.filter(order__user=user, dish=dish).exists():
            raise exceptions.ValidationError(
                "You need to have ordered this dish to be able to rate it!"
            )

        rating = DishRating.objects.create(
            dish=dish,
            user=user,
            rating=rating,
        )
        rating.save()

        serializer = self.get_serializer(rating)

        return Response(serializer.data)


class DishCategoryViewSet(viewsets.ModelViewSet):
    queryset = models.DishCategory.objects.all()
    serializer_class = serializers.DishCategoryDetailSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.DishCategoryListSerializer

        return super().get_serializer_class()
