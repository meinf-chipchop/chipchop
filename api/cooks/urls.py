from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter

from api.urls import router

from . import viewsets

cooks_router = NestedDefaultRouter(
    router,
    r"cooks",
    lookup="cook",
)

cooks_router.register(
    r"dishes",
    viewsets.DishViewSet,
    basename="dish",
)

urlpatterns = [
    path("", include(cooks_router.urls)),
]
