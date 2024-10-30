from rest_framework.exceptions import ValidationError

from . import models


class OrderUpdateStatusValidator:
    """
    Validator for checking if the order status update is valid, checks that the new status is 'forward'
    """

    message = "Invalid status, new status must move the order forward"

    def __init__(self, message=None):
        self.message = message or self.message

    def __call__(self, value):
        print("Calling OrderUpdateStatusValidator")


class OrderCreationValidator:
    """Validator for checking if the order creation is valid, checks that if the order type is delivery,
    the deliverer is set"""

    def __init__(self, order_type, deliverer, address):
        self.order_type = order_type
        self.deliverer = deliverer
        self.address = address

    def validate(self):
        if self.order_type == models.Order.OrderType.DELIVERY:
            if not self.deliverer or not self.address:
                raise ValidationError(
                    "Deliverer and address must be provided for delivery orders"
                )

        if self.order_type == models.Order.OrderType.PICKUP:
            self.deliverer = None
            self.address = None

        if self.address:
            if self.address.user != self.context["request"].user:
                raise ValidationError("Address does not belong to user")

        return self.order_type, self.deliverer, self.address
