# NestJS Boilerplate

## 1. install

yarn install

> NodeJS V18

<br/>

## 2. Start dev database from docker

yarn db:dev:up

<br/>

## 3. initial prisma database setup

yarn prisma:dev:deploy

<br/>

> Every changes in schema.prisma need to create migration

yarn prisma:dev:migrate

npx prisma generate

<br/>

## 4. Start dev

yarn start:dev

> Swagger UI [http://localhost:3333/swagger](http://localhost:3333/swagger)

<br/>
<br/>

## Build and run with Docker

docker-compose up dev
<br/>
docker-compose up prd
<br/>

> rebuild docker image

docker-compose up --build prd

<br/>

## End to end test

yarn test:e2e

<br/>

## NestJS cli

### create module

nest g module bookmark

### create service

nest g service bookmark --no-spec

### create controller

nest g controller bookmark --no-spec

<br/>

## Note

1. NestJS Crontroller is route
2. NestJS Service is for business logic / CRUD with database
3. DTO (Data Transfer Object) schema
4. Prisma is an ORM, auto create interface model for typescript
5. db:dev:restart - restart a new local database in docker
6. db:test:restart - restart a new local database in docker for e2e testing

<br/>

## Resources

freeCodeCamp: NestJs Course for Beginners - Create a REST API https://youtu.be/GHTA143_b-s
