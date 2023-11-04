# Multi-stage Build


#Use the official Node.js:lts runtime as a base image and set this layer to a variable to be referenced further down
FROM node:lts AS node


# Builder Stage


# Starting the first stage to a variable of builder
FROM node as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies - prod and dev (Need for TypeScript and etc.)
RUN npm install

# Copy the TypeScript source code
COPY . .

# Run the build command to transpile our TypeScript over to our target JavaScript code. This places the
RUN npm run build


# Final Stage

FROM node AS final

# The node:lts images comes with a non-root user named node
# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app/build && chown -R node:node /home/node/app

# Set the CWD
WORKDIR /home/node/app  

# Install PM2
RUN npm i -g pm2

# Copy package.json, package-lock.json, and process.yml to the working directory
COPY package*.json process.yml ./

# Install only production dependencies
RUN npm install --omit=dev

# Switch to user node
USER node

# Change ownership to user node and copy transpiled JavaScript files in the /app/build directory from the builder stage into the final image
COPY --chown=node:node --from=builder /app/build ./build

# Sets the env var
ENV NODE_ENV=production
# ENV PORT=4000 - AWS doesn't allow for the setting of PORT as an env var

# Documents what port we want exposed on the container in order for requests to access our service
EXPOSE 4000

# Now that our production dependencies have been installed and we are running only JavaScript code, we can use the node command to start our application without any other configuration 
# ENTRYPOINT [ "node", "./build/index.js" ]
ENTRYPOINT [ "pm2-runtime", "./process.yml" ]