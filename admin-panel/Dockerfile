FROM node:lts-slim

ARG RUN_BUILD

WORKDIR /app/

ADD . .

RUN npm install
# RUN if [ "$RUN_BUILD" = 1 ]; then bun run build; fi

CMD ["npm", "run", "dev"]
