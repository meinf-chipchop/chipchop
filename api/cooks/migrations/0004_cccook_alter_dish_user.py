# Generated by Django 4.2.16 on 2024-10-15 17:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_ccuser_role'),
        ('cooks', '0003_alter_dish_discount'),
    ]

    operations = [
        migrations.CreateModel(
            name='CCCook',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('public_name', models.CharField()),
            ],
            options={
                'verbose_name_plural': 'Chip Chop Cooks',
            },
        ),
        migrations.AlterField(
            model_name='dish',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cooks.cccook'),
        ),
    ]