from rest_framework_nested.routers import NestedDefaultRouter

from api.urls import router
from . import viewsets

router = NestedDefaultRouter(
    router,
    r"orders",
    lookup="order",
)
