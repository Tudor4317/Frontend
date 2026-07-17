FROM node
COPY . /frontend
WORKDIR /frontend
RUN npm install
CMD ["npm", "run", "dev"]
