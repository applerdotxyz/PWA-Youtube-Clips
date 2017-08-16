FROM node:7.3.0

#INSTALL
RUN apt-get update -y
RUN echo `node -v`
RUN npm i -g supervisor yarn

#workaround to mount the directory for dev without having to rerun npm i
RUN rm -rf /dist/
RUN mkdir -p /dist/
ADD package.json /dist/

# Install packages
RUN cd /dist && yarn install
WORKDIR /dist
# Make everything available for start
ADD . /dist

# CMD [ "npm", "run", "start" ]

EXPOSE 8080


# # Create app directory
# RUN mkdir -p /frontend
# WORKDIR /frontend


# # Bundle app source
# COPY . /frontend
# RUN yarn install

# WORKDIR /frontend
# # Make everything available for start
# ADD . /frontend


# EXPOSE 8080

# # CMD [ "npm", "run", "start" ]