from django.urls import path, include

from rest_framework.routers import DefaultRouter

import users.viewsets
import petitions.viewsets


router = DefaultRouter()
router.register(r'users', users.viewsets.UserViewSet, basename="user")
router.register(r'tokens', users.viewsets.TokenViewSet, basename="token")
router.register(r'account-approvals', petitions.viewsets.AccountUpgradePetitionViewset, basename="account-approval")

urlpatterns = [
    path('', include(router.urls)),
]
