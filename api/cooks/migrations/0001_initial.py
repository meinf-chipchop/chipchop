# Generated by Django 4.2.16 on 2024-10-29 18:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
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
        migrations.CreateModel(
            name='DishCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('image_url', models.URLField(null=True)),
            ],
            options={
                'verbose_name_plural': 'Dish Categories',
            },
        ),
        migrations.CreateModel(
            name='Dish',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('discount', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('hidden', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(editable=False)),
                ('last_update_at', models.DateTimeField(editable=False, null=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='cooks.dishcategory')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cooks.cccook')),
            ],
            options={
                'verbose_name_plural': 'Dishes',
            },
        ),
    ]