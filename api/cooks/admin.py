from django.contrib import admin

from . import models

admin.site.register(models.CCCook)
admin.site.register(models.Dish)
admin.site.register(models.DishCategory)
admin.site.register(models.DishRating)
