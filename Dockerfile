FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . /app
COPY package.json /app
RUN pnpm install
RUN pnpm run build

EXPOSE 3000
ENV HOSTNAME "0.0.0.0"

CMD [ "pnpm", "start" ]