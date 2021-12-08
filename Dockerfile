FROM ubuntu:14.04

# System requirements installation

RUN apt-get update && \
	apt-get install -y --force-yes nginx git build-essential curl supervisor && mkdir /opt/app

RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - && \
    apt-get install -y --force-yes nodejs

COPY package.json /opt/app/
COPY yarn.lock /opt/app

WORKDIR /opt/app

RUN npm install -g yarn
RUN yarn install


# Encoding fix for correct UTF handling in python packages

RUN sudo locale-gen 'en_US.UTF-8'
ENV LC_CTYPE 'en_US.UTF-8'
ENV LC_NUMERIC 'en_US.UTF-8'
ENV LC_TIME 'en_US.UTF-8'
ENV LC_COLLATE 'en_US.UTF-8'
ENV LC_MONETARY 'en_US.UTF-8'
ENV LC_MESSAGES 'en_US.UTF-8'
ENV LC_PAPER 'en_US.UTF-8'
ENV LC_NAME 'en_US.UTF-8'
ENV LC_ADDRESS 'en_US.UTF-8'
ENV LC_TELEPHONE 'en_US.UTF-8'
ENV LC_MEASUREMENT 'en_US.UTF-8'
ENV LC_IDENTIFICATION 'en_US.UTF-8'
RUN locale

# Copying application code into container

COPY . /opt/app

RUN yarn run build


VOLUME ['/opt/app/media']

# Nginx setup

RUN rm /etc/nginx/sites-enabled/default;
RUN ln -s /opt/app/Deploy/nginx.conf /etc/nginx/sites-enabled/;
RUN ln -s /opt/app/Deploy/start_in_docker.sh /opt/app/start_in_docker.sh;

EXPOSE 80

