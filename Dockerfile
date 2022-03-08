# => Build container
FROM node as build

# Set the working directory
WORKDIR /app

# Copy the package.json and install the dependencies
COPY . ./
RUN npm i &&\
    npm run build

# => Run container
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

# Static build
COPY --from=build /app/build /usr/share/nginx/html

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Copy .env file and shell script to container
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

RUN sed -i 's/\/public\/env-config.js/\/env-config.js/g' /usr/share/nginx/html/env.sh
RUN chmod +x /usr/share/nginx/html/env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
