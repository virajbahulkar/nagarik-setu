FROM node:20-alpine
WORKDIR /workspace
RUN apk add --no-cache bash curl
COPY . .
EXPOSE 3000
