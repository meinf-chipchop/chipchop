from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

import users.viewsets
import cooks.viewsets

router = DefaultRouter()
router.register(r"users", users.viewsets.UserViewSet, basename="user")
router.register(r"tokens", users.viewsets.TokenViewSet, basename="token")
router.register(r"cooks", cooks.viewsets.CCCookViewSet, basename="cook")

cooks_router = NestedDefaultRouter(router, r"cooks", lookup="cook")
cooks_router.register(r"dishes", cooks.viewsets.DishViewSet, basename="dish")


urlpatterns = [
    path('', include(router.urls)),
    path('', include(cooks_router.urls)),
]

