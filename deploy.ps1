git pull --rebase;
git push -u origin;
git push -u gitlab;
docker build -t registry.gitlab.com/grillbot/grillbot-public-web .
docker push registry.gitlab.com/grillbot/grillbot-public-web
