FROM node:10.15.1

# Set working directory
WORKDIR /frontend

# Copy app dependencies to container
COPY ./frontend/package*.json ./

# add `./node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# Install app dependencies
RUN npm install

# Deploy app for local development
CMD npm start --host 0.0.0.0 --port ${REACT_PORT} --disableHostCheck true
