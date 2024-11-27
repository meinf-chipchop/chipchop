from rest_framework import viewsets, status, response
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models, serializers

from users.models import UserRoles
from deliverers.models import CCDeliverer
from cooks.models import CCCook
from ratings.models import DeliveryRating

from ratings.serializers import (
    DeliveryRatingCreationSerializer,
    DeliveryRatingDetailSerializer,
)

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
    
    def dispatch(self, *args, **kwargs):
        response = super().dispatch(*args, **kwargs)
        if isinstance(response, Response):
            response['Cache-Control'] = "max-age=3600"
            if self.action == "retrieve":
                response["Last-Modified"] = self.get_object().last_updated
                
        return response

    def get_queryset(self):
        user_filter = models.Order.objects.filter(
            user=self.request.user,
        )

        if self.request.user.role == UserRoles.COOK:
            return (
                models.Order.objects.filter(
                    orderdish__dish__user=CCCook.objects.get(user=self.request.user),
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
        if self.action == "rate":
            if self.request.method == "POST" or self.request.method == "PUT":
                return DeliveryRatingCreationSerializer
            return DeliveryRatingDetailSerializer

        if self.action == "list":
            return serializers.OrderListSerializer

        if self.action == "create":
            return serializers.OrderCreationSerializer

        if self.action == "update":
            if self.request.user.role == UserRoles.USER:
                return serializers.EmptySerializer
            return serializers.OrderUpdateSerializer

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

    @action(detail=True, methods=["GET"])
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

    @action(
        detail=True,
        methods=["GET", "POST", "PUT"],
    )
    def rate(self, request, pk=None):

        if request.user != self.get_object().user:
            return response.Response(
                {"error": "Only the user that made the order can rate the delivery"},
                status=status.HTTP_403_FORBIDDEN,
            )

        if self.request.method == "GET":
            return self.rate_fetch(request, pk)
        else:
            order_rating = DeliveryRatingCreationSerializer(
                data=request.data,
                context={"request": request},
            )

            if not order_rating.is_valid():
                return response.Response(
                    order_rating.errors,
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return self.rate_create(request, pk)

    def rate_fetch(self, request, pk=None):
        order_rating = DeliveryRating.objects.filter(order=self.get_object()).first()

        if order_rating is None:
            return response.Response(
                {"error": "Rating not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(order_rating)
        return response.Response(serializer.data)

    def rate_create(self, request, pk=None):
        if self.request.method == "PUT":
            order_rating = DeliveryRating.objects.filter(
                order=self.get_object()
            ).first()
            if order_rating is None:
                return response.Response(
                    {"error": "Rating not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            rating = request.data.get("rating")
            if rating is not None:
                order_rating.rating = rating

            note = request.data.get("note")
            if note is not None:
                order_rating.note = note

            order_rating.save()
        elif self.request.method == "POST":
            order_rating = DeliveryRatingCreationSerializer(
                data=request.data,
                context={"request": request},
            )

            if DeliveryRating.objects.filter(order=self.get_object()).exists():
                return response.Response(
                    {"error": "Rating already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            order_rating.save()

        serializer = self.get_serializer(order_rating)
        return response.Response(serializer.data)
