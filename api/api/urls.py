from django.urls import path, include

from rest_framework.routers import DefaultRouter

from users import viewsets

router = DefaultRouter()
router.register(r'users', viewsets.UserViewSet, basename="user")
router.register(r'tokens', viewsets.TokenViewSet, basename="token")

urlpatterns = [
    path('', include(router.urls)),
]
