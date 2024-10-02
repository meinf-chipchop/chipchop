FROM oven/bun:latest

ARG RUN_BUILD

WORKDIR /admin-panel
COPY . .

RUN bun install
RUN if [ "$RUN_BUILD" = 1 ]; then bun run build; fi

CMD ["bun", "run", "start"]