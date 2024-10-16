from django.urls import path, include
from rest_framework.routers import DefaultRouter


import cooks.viewsets
import deliverers.viewsets
import petitions.viewsets
import users.viewsets

# Initialize the main router
router = DefaultRouter()

router.register(r"login", users.viewsets.LoginViewSet, basename="login")
router.register(r"logout", users.viewsets.LogoutViewSet, basename="logout")
router.register(r"cooks", cooks.viewsets.CCCookViewSet, basename="cook")
router.register(r'users', users.viewsets.UserViewSet, basename="user")
router.register(r'tokens', users.viewsets.TokenViewSet, basename="token")
router.register(r'account-approvals', petitions.viewsets.AccountUpgradePetitionViewset, basename="account-approval")
router.register(r"deliverers", deliverers.viewsets.CCDelivererViewSet, basename="deliverer")



urlpatterns = [
    path("", include(router.urls)),
    path("", include("cooks.urls")),
]
