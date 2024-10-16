from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone


User = get_user_model()


class AccountUpgradePetition(models.Model):

    class PetitionState(models.TextChoices):
        PENDING = ("P", "Pending")
        ACCEPTED = ("A", "Accepted")
        REJECTED = ("R", "Rejected")

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    state = models.TextField(
        choices=PetitionState.choices,
        default=PetitionState.PENDING,
        max_length=1,
    )
    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField(editable=False, null=True)

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        return super(AccountUpgradePetition, self).save(*args, **kwargs)
