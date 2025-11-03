FROM node:24-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install turbo --global
COPY . .

RUN turbo prune @icat/web --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ ./
RUN npm ci

COPY --from=builder /app/tsconfig.base.json ./tsconfig.base.json
COPY --from=builder /app/out/full/ ./
RUN npm run build


FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 irfancarsandtours
RUN adduser --system --uid 1001 irfan
USER irfan

COPY --from=installer --chown=irfan:irfancarsandtours /app/apps/web/.next/standalone ./
COPY --from=installer --chown=irfan:irfancarsandtours /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=irfan:irfancarsandtours /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]