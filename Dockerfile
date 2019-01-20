FROM amazonlinux

# Create deploy directory
WORKDIR /www

# Install system dependencies
RUN yum -y install make gcc*
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum -y install nodejs

ADD package.json package-lock.json /www/

VOLUME ["./node_modules", "/www/node_modules"]
RUN npm install

