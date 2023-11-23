FROM node:18.0-slim
COPY ./ ./
#RUN npm install phantomjs -g
RUN npm install

EXPOSE 8080
ENTRYPOINT ["npm"]
CMD ["start"]
