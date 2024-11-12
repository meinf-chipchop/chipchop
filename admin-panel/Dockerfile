FROM node:lts-slim

ARG DEV_MODE

WORKDIR /app/

COPY .next .
COPY public ./public
COPY *.json .

COPY app ./app
COPY lib ./lib
COPY ./node_modules .

COPY next* .

RUN npm install \
  && if [ "$DEV_MODE" = FALSE ]; then npm run build; fi
CMD if [ "$DEV_MODE" = FALSE ]; then npm run start; else npm run dev; fi
