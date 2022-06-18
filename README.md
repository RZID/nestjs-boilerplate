# Start dev
yarn start:dev 

<br/>

# End to end test
yarn test:e2e

<br/>

# NestJS cli
## create module
nest g module bookmark
## create service
nest g service bookmark --no-spec 
## create controller
nest g controller bookmark --no-spec 

<br/>

# Note
1. NestJS Crontroller is route
2. NestJS Service is for business logic / CRUD with database
3. DTO (Data Transfer Object) schema
4. Prisma is an ORM, auto create interface model for typescript
5. db:dev:restart start a local Postgres database in docker
6. db:test:restart start a local Postgres database in docker for e2e testing

<br/>

# Resources
freeCodeCamp: NestJs Course for Beginners - Create a REST API https://youtu.be/GHTA143_b-s