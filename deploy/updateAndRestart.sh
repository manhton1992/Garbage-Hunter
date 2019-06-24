#!/bin/bash

# any future command that fails will exit the script
# set -e

# Delete the old repo
# rm -rf /garbage-hunter

# go the project folder
cd garbage-hunter

# down the docker compose
sudo docker-compose stop frontend
sudo docker-compose stop backend

# checkout to master branch
# git checkout master
git checkout master

# pull the new code
# git pull origin master
git pull origin master

# build the docker compose
sudo docker-compose build frontend
sudo docker-compose build backend

# run the docker compose
sudo docker-compose up backend frontend
