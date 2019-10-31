FROM node:10 as dep

COPY package.json package-lock.json ./

RUN npm install --production

FROM node:10
RUN groupadd -r --gid 1007 dockerrunner && useradd -r -g dockerrunner dockerrunner
WORKDIR /app
COPY --from=dep /node_modules ./node_modules
EXPOSE 9060
ADD . .
USER dockerrunner
CMD [ "node", "stedsnavn-api.js", "--port", "9060", "/data/" ]
