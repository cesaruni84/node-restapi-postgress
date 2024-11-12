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

# Volumenes
docker run -d --name my-node-container -v /path/to/host:/path/to/container -p 4000:4000 node-apirest
docker volume create my-volume
docker volume ls
docker volume inspect my-volume
docker volume rm my-volume

```

