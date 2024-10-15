#!/bin/bash
python manage.py makemigrations
python manage.py makemigrations users
python manage.py migrate
python manage.py adminfromenv
python manage.py runserver 0.0.0.0:8000