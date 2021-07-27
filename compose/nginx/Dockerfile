FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./compose/nginx/nginx.conf.template /etc/nginx/conf.d/nginx.conf.template

COPY ./compose/nginx/entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]

RUN ["chmod", "+x", "/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]