# =========================
# STAGE 1 — BUILD
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# copia apenas package primeiro (cache)
COPY package*.json ./

RUN npm install

# copia resto do projeto
COPY . .

# compila typescript
RUN npm run build


# =========================
# STAGE 2 — PRODUCTION
# =========================
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# copia apenas dependências necessárias
COPY package*.json ./

RUN npm install --omit=dev

# copia build gerado
COPY --from=builder /app/dist ./dist

# copia arquivos extras necessários
COPY --from=builder /app/.env ./

EXPOSE 3000

# segurança (não rodar como root)
USER node

# healthcheck básico
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
CMD node -e "require('http').get('http://localhost:3000/status',res=>process.exit(res.statusCode===200?0:1))"

CMD ["node","dist/server.js"]