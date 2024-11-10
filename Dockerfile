FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . /app
COPY package.json /app
RUN pnpm install
# RUN pnpm run build

EXPOSE 80
ENV HOSTNAME "0.0.0.0"
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "pnpm", "dev" ]