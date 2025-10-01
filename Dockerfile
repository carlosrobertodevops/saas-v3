# syntax=docker/dockerfile:1.6

##
## ARGs comuns
##
ARG NODE_VERSION=22-alpine
ARG PNPM_VERSION=10.17.1

##
## STAGE: deps  -> resolve e instala dependências com pnpm
##
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

# Habilita pnpm via corepack
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Copia apenas o necessário para calcular deps (melhor cache)
COPY package.json pnpm-lock.yaml ./

# Baixa o conteúdo das deps para o store (cacheável)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm fetch

# Copia o projeto completo
COPY . .

# Instala usando o store baixado
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

##
## STAGE: builder -> builda o Next (gera .next/standalone)
##
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

ARG PNPM_VERSION
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Traz o projeto já com node_modules da stage deps
COPY --from=deps /app ./

# Build Next.js (output standalone)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm build

##
## STAGE: runner (produção) -> imagem final e enxuta
##
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Usuário não-root
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copia somente o necessário para rodar
# - public (assets estáticos públicos)
# - .next/standalone (server.js + node_modules necessários)
# - .next/static (assets do Next)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]

##
## STAGE: dev (hot-reload) -> para docker-compose.local.yaml
##
FROM node:${NODE_VERSION} AS dev
WORKDIR /app

ARG PNPM_VERSION
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Instala as deps inicialmente (o código virá por volume)
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install

# Em dev o código é montado via volume; node_modules fica no container
CMD ["pnpm", "dev"]
