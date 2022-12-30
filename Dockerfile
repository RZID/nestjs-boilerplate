###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18.12-alpine3.16 AS development

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN yarn install
COPY --chown=node:node . .
RUN npx prisma generate
USER node


###################
# BUILD FOR PRODUCTION MINIMIZED
###################

FROM node:18.12-alpine3.16 AS build

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN yarn install
COPY --chown=node:node . .
RUN npx prisma generate
RUN npm run build
ENV NODE_ENV production
RUN yarn install --frozen-lockfile --production && npm cache clean --force
USER node


###################
# PRODUCTION MINIMIZED
###################

FROM node:18.12-alpine3.16 AS production

WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist