#NodeJS Postgres API Restful
### Instalación de dependencias

Para instalar las dependencias necesarias, ejecute los siguientes comandos:

```bash
npm install body-parser express morgan pg psql winston
```

### Iniciar el servidor de NODEJS
Para iniciar el servidor, ejecute el siguiente comando:

```bash
npm run dev
```

### Dockerizacion
Para ejecutar el contenedor de Docker, ejecute el siguiente comando:

```bash
docker build -t node-apirest .

#Crea imagen apuntando a archivo .env
docker build -t node-apirest --build-arg ENV_FILE=.env .

docker run -p 3000:3000 node-apirest
docker run -d --name my-node-container -p 4000:4000 node-apirest # Iniciar contenedor con nombre y puerto
docker run -d -p HOST_PORT:CONTAINER_PORT nginx # Iniciar contenedor con puerto especifico
docker run -d --name my-node-container --network my-network -p 4000:4000 node-apirest 
```

### Comandos docker utilitarios
```bash
docker ps -a # Listar contenedores
docker images # Listar imagenes
docker rmi <image_id> # Eliminar imagen
docker rm <container_id> # Eliminar contenedor
docker exec -it <container_id> bash # Ingresar al contenedor
docker stop <container_id> # Detener contenedor
docker run -p 3000:3000 -d node-apirest # Iniciar contenedor en background
docker run -d --name my-node-container -p 4000:4000 node-apirest # Iniciar contenedor con nombre y puerto
docker run -d -p HOST_PORT:CONTAINER_PORT nginx # Iniciar contenedor con puerto especifico

docker start <container_id> # Iniciar contenedor
docker logs <container_id> # Ver logs del contenedor
docker inspect <container_id> # Ver detalles del contenedor
docker-compose up -d # Iniciar contenedor con docker-compose
docker-compose down # Detener contenedor con docker-compose
docker-compose ps # Listar contenedores con docker-compose
docker-compose logs <container_id> # Ver logs del contenedor con docker-compose
docker-compose exec <container_id> bash # Ingresar al contenedor con docker-compose
docker-compose exec <container_id> psql -U postgres -d node_api # Ingresar a la base de datos
docker-compose exec <container_id> node seeds/seed.js # Ejecutar seed
docker-compose exec <container_id> node seeds/seed.js --undo # Eliminar seed
docker-compose exec <container_id> npm run test # Ejecutar pruebas dentro del contenedor
docker-compose exec <container_id> npm run test:coverage # Ejecutar pruebas con covertura dentro del contenedor
docker-compose exec <container_id> npm run test:watch # Ejecutar pruebas en modo watch dentro del contenedor
docker-compose exec <container_id> npm run test:unit # Ejecutar pruebas unitarias dentro del contenedor
docker-compose exec <container_id> npm run test:integration # Ejecutar pruebas de integración dentro del contenedor
docker network ls # Listar redes
docker network inspect <network_id> # Ver detalles de la red
docker network create <network_name> # Crear red
docker network connect <network_id> <container_id> # Conectar contenedor a red
docker network disconnect <network_id> <container_id> # Desconectar contenedor de red

# Crear contenedor apuntando a red especifica
docker run -d --name my-node-container --network my-network -p 4000:4000 node-apirest 
docker network create --subnet=192.168.100.0/24 my-custom-network

# Volumenes comandos
docker run -d --name my-node-container -v /path/to/host:/path/to/container -p 4000:4000 node-apirest
docker volume create my-volume
docker volume ls
docker volume inspect my-volume
docker volume rm my-volume

```

### Despliegue en Azure Web App
Para desplegar la aplicación en Azure Web App, ejecutamos los siguientes comandos:

```bash
az login
az webapp up --sku F1 -n my-node-app

# Crear grupo de recursos y plan de servicio
az group create --name rgDocker01 --location "East US"
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name myAppName --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml

# Crea Web App con Docker Compose
az webapp create --resource-group myResourceGroup --plan myServicePlan --name api-node-rest01 --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml

# Crear Web App con archivo .env
az webapp create --resource-group myResourceGroup --plan myServicePlan --name api-node-rest02 --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml --env .env

# Crear Web App en base a imagen de contenedor de Azure Registry
az webapp create --resource-group myResourceGroup --plan myServicePlan --name api-node-rest01 --deployment-container-image-name cesaruni.azurecr.io/node-apirest:v1

# Eliminar Web App
az webapp delete --name api-node-rest01 --resource-group myResourceGroup

# Reiniciar Web App
az webapp restart --name api-node-rest01 --resource-group myResourceGroup

# listar grupos de recursos
az group list --output table

# Crear Plan de Servicio con SKU Free
az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku F1

# Listar Planes de Servicio
az appservice plan list --output table

########## CONTAINER INSTANCES ##########
# Listar Azure Container Instances
az container list --resource-group myResourceGroup --output table

# Usar Azure Container Instances
az container create --resource-group myResourceGroup --name mycontainer --image mycontainerimage --cpu 1 --memory 1 --registry-username myusername --registry-password mypassword

# Login en Azure ACR
az acr login --name <NombreDelACR> #cesaruni

# Construir imagen de contenedor
docker build -t node-apirest .

# Tagear imagen en un registro de contenedores de Azure
docker tag node-apirest cesaruni.azurecr.io/node-apirest:v1

# Loguearse en el registro de contenedores de Azure
docker push cesaruni.azurecr.io/node-apirest:v1


# Example 01 - Create RG + Container Azure
# 
az group create --name myResourceGroup --location eastus2

az container create --resource-group myResourceGroup --name mycontainer01 --image mcr.microsoft.com/azuredocs/aci-helloworld --dns-name-label aci-demo01 --ports 80

az container create --resource-group myResourceGroup --name mycontainer02 --image cesaruni.azurecr.io/node-apirest:v1 --dns-name-label aci-demo02 --ports "4000:4000"


az container show --resource-group myResourceGroup --name mycontainer01 --query "{FQDN:ipAddress.fqdn ProvisioningState:provisioningState}" --out table

az container logs --resource-group myResourceGroup --name mycontainer01

# Crear un container en base a un archivo docker-compose
az container create --resource-group myResourceGroup --name mycontainer03 --file . docker-compose.yml


```
