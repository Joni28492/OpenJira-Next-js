# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb

```

- Reconstruir los modulos de node y levantar Next

```
yarn install
yarn dev
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a : **.env**

## Llenar la base de datos con información de pruebas

Llamar:

```
http://localhost:3000/api/seed
```
