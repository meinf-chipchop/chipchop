from django.urls import path, include
from rest_framework.routers import DefaultRouter


import cooks.viewsets
import deliverers.viewsets
import petitions.viewsets
import users.viewsets

# Initialize the main router
router = DefaultRouter()

router.register(
    r"cooks",
    cooks.viewsets.CCCookViewSet,
    basename="cook",
)

router.register(
    r"deliverers",
    deliverers.viewsets.CCDelivererViewSet,
    basename="deliverer",
)

router.register(
    r"users",
    users.viewsets.UserViewSet,
    basename="user",
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


urlpatterns = [
    path("", include(router.urls)),
    path("", include("cooks.urls")),
]
