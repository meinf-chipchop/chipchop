from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter

from api.urls import router

from . import viewsets

orders_router = NestedDefaultRouter(
    router,
    r"orders",
    lookup="order",
)

orders_router.register(
    r"dishes",
    viewsets.OrderDishesViewSet,
    basename="order-dish",
)

urlpatterns = [
    path("", include(orders_router.urls)),
]
