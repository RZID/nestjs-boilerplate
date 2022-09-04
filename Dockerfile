FROM node:18-alpine AS development

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN npx prisma generate
RUN yarn build


FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
# COPY . .
# RUN npx prisma generate
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/prisma ./prisma
RUN yarn add prisma -g
RUN npx prisma generate
# COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/
# COPY --from=development /usr/src/app/node_modules/@prisma ./node_modules/
# CMD ["node", "dist/src/main"]