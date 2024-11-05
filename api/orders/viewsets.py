from rest_framework import viewsets, status, response
from django.contrib.auth import get_user_model
from rest_framework.decorators import action

from . import models, serializers

from users.models import UserRoles
from deliverers.models import CCDeliverer
from cooks.models import CCCook
from ratings.models import DeliveryRating

from ratings.serializers import DeliveryRatingSerializer

User = get_user_model()


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


class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        user_filter = models.Order.objects.filter(
            user=self.request.user,
        )

        if self.request.user.role == UserRoles.COOK:
            return (
                models.Order.objects.filter(
                    dishes__dish__cook__user=CCCook.objects.get(user=self.request.user),
                )
                | user_filter
            )

        if self.request.user.role == UserRoles.DELIVERER:
            return (
                models.Order.objects.filter(
                    deliverer=CCDeliverer.objects.get(user=self.request.user),
                )
                | models.Order.objects.filter(
                    order_type=models.Order.OrderType.DELIVERY,
                    deliverer=None,
                )
                | user_filter
            )

        return user_filter

    def get_serializer_class(self):
        # TODO - Different information for each role?
        # if self.request.user.role == UserRoles.USER:
        # if self.request.user.role == UserRoles.COOK:
        # if self.request.user.role == UserRoles.DELIVERER:

        if self.action == "list":
            return serializers.OrderListSerializer

        if self.action == "create":
            return serializers.OrderCreationSerializer

        if self.action == "update":
            return serializers.OrderUpdateSerializer

        if self.action == "rate_delivery":
            return DeliveryRatingSerializer

        return super().get_serializer_class()

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        data["user"] = request.user

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return response.Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

    @action(detail=True, methods=["get"])
    def accept(self, request, pk=None):
        if request.user.role != UserRoles.DELIVERER:
            return response.Response(
                {"error": "Only deliverers can accept orders"},
                status=status.HTTP_403_FORBIDDEN,
            )

        order = models.Order.objects.get(pk=pk)

        deliverer = CCDeliverer.objects.get(user=request.user)
        order.deliverer = deliverer
        order.save()

        serializer = self.get_serializer(order)
        return response.Response(serializer.data)

    @action(detail=True, methods=["post"])
    def rate_delivery(self, request, pk=None):
        if request.user != self.get_object().user:
            return response.Response(
                {"error": "Only the user that made the order can rate the delivery"},
                status=status.HTTP_403_FORBIDDEN,
            )

        rating = request.data.get("rating")
        if rating is None:
            return response.Response(
                {"error": "Rating is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        note = request.data.get("note")

        order_rating = DeliveryRating.objects.create(
            order=self.get_object(),
            rating=rating,
            note=note,
        )

        serializer = self.get_serializer(order_rating)
        return response.Response(serializer.data)
