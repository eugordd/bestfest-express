echo "Init script started"
docker-compose -f ./devops/docker-compose.yml down
echo "docker-compose down ✅"
docker rmi "$(docker images | grep 'bestfest')"
echo "docker rmi ✅"
docker-compose -f ./devops/docker-compose.yml rm -v
echo "docker-compose rm -v ✅"
docker-compose -f ./devops/docker-compose.yml build
echo "docker-compose build ✅"
docker-compose -f ./devops/docker-compose.yml up -d
echo "docker-compose up ✅"
docker volume prune -f
echo "docker volume prune ✅"
