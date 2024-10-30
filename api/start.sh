#!/bin/bash

# Update the db with the models / changes 
python manage.py makemigrations --noinput deliverers orders users cooks petitions
python manage.py migrate --noinput

# Create superuser from environment variables
python manage.py adminfromenv

# Start the server
python manage.py runserver 0.0.0.0:8000