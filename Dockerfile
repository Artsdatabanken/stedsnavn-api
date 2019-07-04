FROM node:10 as dep

COPY package.json package-lock.json ./

RUN npm install --production

FROM node:10
WORKDIR /app
COPY --from=dep /node_modules ./node_modules
EXPOSE 9060
ADD . .
CMD [ "node", "stedsnavn-api.js", "--port", "9060", "/data/" ]
