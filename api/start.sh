#!/bin/bash

# Update the db with the models / changes 
python manage.py makemigrations users cooks deliverers orders petitions 
python manage.py migrate

# Create superuser from environment variables
python manage.py adminfromenv

# Start the server
python manage.py runserver 0.0.0.0:8000