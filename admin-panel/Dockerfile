FROM node:lts-slim

ARG DEV_MODE

WORKDIR /app/

COPY package*.json .
COPY node_modules .

RUN npm install \
  && if [ "$DEV_MODE" = FALSE ]; then npm run build; fi
CMD if [ "$DEV_MODE" = FALSE ]; then npm run start; else npm run dev; fi
