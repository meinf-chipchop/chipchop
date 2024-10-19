FROM node:lts-slim

ARG DEV_MODE

WORKDIR /app/

ADD . .

RUN npm install
RUN if [ $DEV_MODE = FALSE ]; then npm run build; fi
CMD if [ $DEV_MODE = FALSE ]; then npm run start; else npm run dev; fi
