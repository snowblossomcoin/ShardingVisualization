FROM node


COPY . /ShardingVisualization
WORKDIR /ShardingVisualization
RUN npm config set fund false
RUN npm install .

RUN npm run build
# bundles app into /ShardingVisualization/dist directory

CMD ["/usr/local/bin/npm", "run", "serve"]
EXPOSE 9000
# serves at 9000
