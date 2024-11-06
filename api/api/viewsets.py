from rest_framework import viewsets, mixins, response

from django.contrib.auth import get_user_model
from django.utils.timezone import now

from cooks.models import CCCook
from deliverers.models import CCDeliverer
from orders.models import Order


User = get_user_model()


def get_model_monthly_statistics(model):
    result = {}
    for i in range(1, 13):
        result[i] = get_model_by_month(model, i)
    return result


def get_model_week_day_statistics(model):
    result = {}
    for i in range(1, 8):
        result[i] = get_model_by_week_day(model, i)
    return result


def get_model_by_month(model, month):
    if model == User:
        return model.objects.filter(date_joined__month=month).count()
    else:
        return model.objects.filter(user__date_joined__month=month).count()


def get_model_by_week_day(model, week_day):
    if model == Order:
        return model.objects.filter(created_at__week_day=week_day).count()
    else:
        return model.objects.filter(order__created_at__week_day=week_day).count()


class StatisticsViewset(mixins.ListModelMixin, viewsets.GenericViewSet):
    def list(self, request, *args, **kwargs):
        month = now().month

        new_cooks_by_month = get_model_monthly_statistics(CCCook)
        new_deliverers_by_month = get_model_monthly_statistics(CCDeliverer)
        new_users_by_month = get_model_monthly_statistics(User)
        orders_by_week_day = get_model_week_day_statistics(Order)
        return response.Response(
            {
                "new_cooks": new_cooks_by_month,
                "new_deliverers": new_deliverers_by_month,
                "new_users": new_users_by_month,
                "orders_by_week_day": orders_by_week_day,
                "total_users": User.objects.count(),
                "total_cooks": CCCook.objects.count(),
                "total_deliverers": CCDeliverer.objects.count(),
                "orders_this_month": Order.objects.filter(
                    created_at__month=month
                ).count(),
            }
        )
