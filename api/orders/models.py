from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

from users.models import CCDelivery


User = get_user_model()

class Order(models.Model):
    
    
    class OrderTypes(models.TextChoices):
        DELIVERY = ("D", "Delivery")
        PICKUP = ("P", "Pickup")
        
        
    class OrderStatus(models.TextChoices):
        PENDING = ("P", "Pending")
        APPROVED = ("A", "Approved")
        REJECTED = ("R", "Rejected")
    
    
    class Meta:
        verbose_name_plural = "Orders"
    
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    delivery = models.ForeignKey(CCDelivery, on_delete=models.CASCADE)
    created_at = models.DateTimeField(editable=False)
    type = models.CharField(choices=OrderTypes.choices, default=OrderTypes.PICKUP, max_length=1)
        
        
    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = timezone.now()
        return super(Order, self).save(*args, **kwargs)