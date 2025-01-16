FROM node:18-alpine

WORKDIR /app

COPY . .
COPY .yarn/releases/yarn-4.6.0.cjs .yarn/releases/
COPY .yarnrc.yml .

ARG SENTRY_AUTH_TOKEN
RUN echo "SENTRY_AUTH_TOKEN=\"$SENTRY_AUTH_TOKEN\"" > .env.sentry-build-plugin

RUN yarn install --immutable && \
    yarn cache clean && \
    yarn lint && \
    yarn build

CMD ["yarn", "start"]