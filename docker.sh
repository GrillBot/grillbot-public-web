#!/bin/sh

docker build -t registry.gitlab.com/grillbot/grillbot-public-web .
docker push registry.gitlab.com/grillbot/grillbot-public-web
