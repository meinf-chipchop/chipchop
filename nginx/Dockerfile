FROM nginx

ARG DEV_MODE=FALSE


COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx-prod.conf /tmp/nginx-prod.conf

RUN mkdir -p /tmp/certs

RUN if [ "$DEV_MODE" = "FALSE" ]; then \
  mv /tmp/nginx-prod.conf /etc/nginx/nginx.conf; \
  fi

