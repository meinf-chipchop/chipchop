from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

import users.viewsets
import cooks.viewsets
import petitions.viewsets

# Initialize the main router
router = DefaultRouter()
router.register(r"cooks", cooks.viewsets.CCCookViewSet, basename="cook")
router.register(r'users', users.viewsets.UserViewSet, basename="user")
router.register(r'tokens', users.viewsets.TokenViewSet, basename="token")
router.register(r'account-approvals', petitions.viewsets.AccountUpgradePetitionViewset, basename="account-approval")

# Initialize the nested router
cooks_router = NestedDefaultRouter(router, r"cooks", lookup="cook")
cooks_router.register(r"dishes", cooks.viewsets.DishViewSet, basename="dish")

# Include the routers in the URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('', include(cooks_router.urls)),
]