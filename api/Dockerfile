# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container to /app
WORKDIR /app

# Add the current directory files (on your machine) to the container
COPY . .

ADD requirements.txt ./requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip \
  && pip install -r requirements.txt

# Start the server
CMD ["bash", "start.sh"]
