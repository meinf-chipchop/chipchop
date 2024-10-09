from django.urls import path, include

from rest_framework.routers import DefaultRouter

import cooks.viewsets
import users.viewsets

router = DefaultRouter()
router.register(r'users', users.viewsets.UserViewSet, basename="user")
router.register(r'tokens', users.viewsets.TokenViewSet, basename="token")
router.register(r'cooks', cooks.viewsets.CCCookViewSet, basename="cook")


urlpatterns = [
    path('', include(router.urls)),
]
