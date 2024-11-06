from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

import cooks.viewsets
import deliverers.viewsets
import petitions.viewsets
import users.viewsets
import orders.viewsets

from . import viewsets


# Initialize the main router
router = DefaultRouter()


router.register(
    r"login",
    users.viewsets.LoginViewSet,
    basename="login",
)
router.register(
    r"logout",
    users.viewsets.LogoutViewSet,
    basename="logout",
)
router.register(
    r"cooks",
    cooks.viewsets.CCCookViewSet,
    basename="cook",
)
router.register(
    r"dish-categories",
    cooks.viewsets.DishCategoryViewSet,
    basename="dish-category",
)
router.register(
    r"users",
    users.viewsets.UserViewSet,
    basename="user",
)
router.register(
    r"adresses",
    users.viewsets.AddressViewSet,
    basename="address",
)
router.register(
    r"tokens",
    users.viewsets.TokenViewSet,
    basename="token",
)

router.register(
    r"account-approvals",
    petitions.viewsets.AccountUpgradePetitionViewset,
    basename="account-approval",
)
router.register(
    r"deliverers",
    deliverers.viewsets.CCDelivererViewSet,
    basename="deliverer",
)
router.register(
    r"orders",
    orders.viewsets.OrderViewSet,
    basename="order",
)
router.register(
    r"stats",
    viewsets.StatisticsViewset,
    basename="stats",
)


urlpatterns = [
    path("", include(router.urls)),
    path("", include("cooks.urls")),
    path("", include("orders.urls")),
    # Swagger urls
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "schema/swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]
