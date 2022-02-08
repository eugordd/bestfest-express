echo "Init script started"
docker-compose -f ./devops/docker-compose-prod.yml -p bestfest --project-directory ./ down
echo "docker-compose down ✅"
docker rmi "$(docker images -q)"
echo "docker rmi ✅"
docker-compose -f ./devops/docker-compose-prod.yml -p bestfest --project-directory ./ rm -v
echo "docker-compose rm -v ✅"
docker-compose -f ./devops/docker-compose-prod.yml -p bestfest --project-directory ./ build
echo "docker-compose build ✅"
docker-compose -f ./devops/docker-compose-prod.yml -p bestfest --project-directory ./ up -d
echo "docker-compose up ✅"
docker volume prune -f
echo "docker volume prune ✅"
