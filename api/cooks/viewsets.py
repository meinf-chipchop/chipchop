
from cooks.serializers import CCCookSerializer
from users.models import CCCook

from rest_framework import permissions

# Create your views here.

from rest_framework import mixins, viewsets

class CCCookViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):  
  queryset = CCCook.objects.all()
  serializer_class = CCCookSerializer

  permission_classes = [permissions.AllowAny]