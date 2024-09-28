#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux and macOS you can run this script directly - `./start-database.sh`
# -----

DB_CONTAINER_NAME="full-stack-weather-app-nextjs-postgres"

# Check if Docker is installed by looking for the 'docker' command in the system.
if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

# Check if the container is already running. If it's running, exit the script.
if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

# Check if the container exists but is not running. If it exists, start the container.
if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

# Import environment variables from the .env file.
set -a
source .env

# Extract the database password and port from the DATABASE_URL in the .env file.
# This assumes the DATABASE_URL follows the format: postgres://user:password@host:port/dbname
DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')

# Check if the password is still set to 'password' (default value).
if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"

  # Prompt the user to generate a new random password if using the default.
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please set a password in the .env file and try again"
    exit 1
  fi

  # Generate a random, URL-safe password using OpenSSL, replacing '+' and '/' with URL-friendly characters.
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')

  # Update the .env file to replace the old password with the newly generated one.
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

# Run a new Docker container with the specified configurations:
# - Set the container name to $DB_CONTAINER_NAME.
# - Pass in environment variables for the PostgreSQL user, password, and database name.
# - Bind the host's $DB_PORT to the container's 5432 port.
docker run -d \
  --name $DB_CONTAINER_NAME \
  -e POSTGRES_USER="postgres" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB="full-stack-weather-app-nextjs" \
  -p "$DB_PORT":5432 \
  docker.io/postgres && echo "Database container '$DB_CONTAINER_NAME' was successfully created"
