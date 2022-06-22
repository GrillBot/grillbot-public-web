git pull --rebase;
git push;
docker build -t registry.gitlab.com/grillbot/grillbot-public-web .
docker push registry.gitlab.com/grillbot/grillbot-public-web
