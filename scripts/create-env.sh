#!/bin/bash

# Paths to .env and .env.example files
ENV_FILE=".env"
ENV_EXAMPLE_FILE=".env.example"

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
  # If .env doesn't exist, copy from .env.example
  cp "$ENV_EXAMPLE_FILE" "$ENV_FILE"
  echo ".env file created from .env.example"
else
  echo ".env file already exists, skipping creation."
fi


DB_CONTAINER_NAME="full-stack-next-app-postgres"

# Check if Docker is installed by looking for the 'docker' command in the system.
if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. If you want to use the app as full-stack app with credential/google auth, please install Docker and set up database through docker with provided script. \nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

# Check if the container is already running. If it's running, exit the script.
if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' is running, great!"
  exit 0
fi

# Check if the container exists but is not running.
if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Existing database container '$DB_CONTAINER_NAME' but is not running, don't forget to run it!"
  exit 0
fi
 echo -e "Docker is installed. If you want to use the app as full-stack app with credential/google auth, please proceed to set up database through docker with provided script."
  exit 1