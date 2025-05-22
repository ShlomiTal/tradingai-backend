COPY . /app/.

# Install tsup globally so postinstall scripts can run
RUN npm install -g tsup

# Then install dependencies (this will run node-mexc-api build successfully)
RUN --mount=type=cache,id=s/935abe70-b8d4-4a67-bdb0-25763b31f452-/root/npm,target=/root/.npm npm i
