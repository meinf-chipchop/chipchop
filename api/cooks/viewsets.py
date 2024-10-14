
from users.models import CCCook

from . import models, serializers

from rest_framework import permissions

# Create your views here.

from rest_framework import mixins, viewsets

class CCCookViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):  
  queryset = CCCook.objects.all()
  serializer_class = serializers.CCCookDetailSerializer
  permission_classes = [permissions.AllowAny]

  def get_serializer_class(self):
    if self.action == 'list':
      return serializers.CCCookListSerializer

    return super().get_serializer_class()


class DishViewSet(viewsets.ModelViewSet):
  queryset = models.Dish.objects.all()
  serializer_class = serializers.DishDetailSerializer

  def get_queryset(self):
    user = self.kwargs["cook_pk"]
    return models.Dish.objects.filter(user=user)


  def get_serializer_class(self):
    if self.action == 'list':
      return serializers.DishListSerializer

    return super().get_serializer_class()