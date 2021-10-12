FROM nginx:stable-alpine

EXPOSE 80
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./certificates /etc/ssl/certs

ENTRYPOINT ["nginx", "-g", "daemon off;"]