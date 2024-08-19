FROM node:18.19.1-alpine3.18
RUN apk add --no-cache \
    bash \
    httpie \
    jq && \
    which bash && \
    which http && \
    which jq
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
COPY sampledata.json /sampledata.json
# WORKDIR /app
# COPY package*.json .
# RUN npm install
# COPY . .
# ENV API_URL=http://localhost:3000
# EXPOSE 3000
# CMD ["npm", "start"]
ENTRYPOINT [ "entrypoint.sh" ]