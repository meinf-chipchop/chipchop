from django.core.management.base import BaseCommand

from django.contrib.auth import get_user_model
import environ

env = environ.Env()
User = get_user_model()

class Command(BaseCommand):
    help = "Creates a superuser from env"

    def handle(self, *args, **options):
        self.stdout.write("Admin user creation... ", ending="")
        if User.objects.filter(is_superuser=True).exists():
            self.stdout.write("OK")
            return
        
        try:
            admin = User.objects.create_superuser(
                username=env("ADMIN_EMAIL"),
                password=env("ADMIN_PASSWORD"),
                email=env("ADMIN_EMAIL"),
            )
            admin.save()
            self.stdout.write("OK")
        except Exception as e:
            self.stderr.write(f"ERROR {e}")

        