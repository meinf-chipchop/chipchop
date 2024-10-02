from django.contrib import admin

from . import models


admin.site.register(models.Address)
admin.site.register(models.CCCook)
admin.site.register(models.CCUser)
admin.site.register(models.CCDelivery)