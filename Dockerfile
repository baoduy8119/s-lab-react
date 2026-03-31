FROM node:22

# Create app directory
WORKDIR app/

ARG DATABASE_URL
ARG DASHBOARD_USERNAME
ARG DASHBOARD_PASSWORD
ARG DASHBOARD_SESSION_SECRET

ENV DATABASE_URL=$DATABASE_URL
ENV DASHBOARD_USERNAME=$DASHBOARD_USERNAME
ENV DASHBOARD_PASSWORD=$DASHBOARD_PASSWORD
ENV DASHBOARD_SESSION_SECRET=$DASHBOARD_SESSION_SECRET
ENV NODE_ENV=production

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package-lock.json ./

#RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm ci

# Bundle app source
COPY . .
#RUN yarn build
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start"]