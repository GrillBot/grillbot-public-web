git pull --rebase;
git push -u origin;
docker build -t ghcr.io/grillbot/grillbot-public-web .
docker push ghcr.io/grillbot/grillbot-public-web
