# 💳 BeTalent Payments API

API **multi-gateway de pagamentos** desenvolvida como teste técnico backend.

O sistema permite realizar compras utilizando **múltiplos provedores de pagamento com fallback automático**, aumentando a confiabilidade no processamento de transações financeiras.

Se um gateway falhar, o sistema tenta automaticamente o próximo gateway ativo conforme prioridade configurada.

---

# 🧠 Objetivo do Projeto

Demonstrar conhecimentos em:

* Arquitetura Backend moderna
* Integração com serviços externos
* Segurança e autenticação
* Organização de código em camadas
* Escalabilidade e boas práticas
* Testes automatizados
* Containerização com Docker

---

# 🚀 Tecnologias Utilizadas

* Node.js
* TypeScript
* Express
* MySQL
* Redis
* Docker
* JWT Authentication
* Swagger (OpenAPI)
* Jest
* Clean Architecture
* Rate Limit
* Winston Logger

---

# 🧩 Diagrama da Arquitetura 

```
                        ┌──────────────────────────┐
                        │        Frontend          │
                        │   Interface de Teste     │
                        │     public/index.html    │
                        └──────────────┬───────────┘
                                       │ HTTP
                                       ▼
                          ┌────────────────────────┐
                          │         Routes         │
                          │      Express Router    │
                          └──────────────┬─────────┘
                                         │
                                         ▼
                          ┌────────────────────────┐
                          │      Controllers       │
                          │  AuthController        │
                          │  ProductController     │
                          │  PaymentController     │
                          │  UserController        │
                          └──────────────┬─────────┘
                                         │
                                         ▼
                          ┌────────────────────────┐
                          │        UseCases        │
                          │  LoginUseCase          │
                          │  BuyProductUseCase     │
                          │  RefundPaymentUseCase  │
                          └──────────────┬─────────┘
                                         │
                ┌────────────────────────┼────────────────────────┐
                ▼                        ▼                        ▼

     ┌────────────────────┐   ┌──────────────────────┐   ┌──────────────────┐
     │     Repositories   │   │   Gateway Strategy   │   │    Middlewares   │
     │ UserRepository     │   │ Gateway1 Adapter     │   │ AuthMiddleware   │
     │ ProductRepository  │   │ Gateway2 Adapter     │   │ RoleMiddleware   │
     │ TransactionRepo    │   └───────────┬──────────┘   │ RateLimit        │
     └──────────┬─────────┘               │              └──────────────────┘
                │                         ▼
                │                ┌──────────────────┐
                │                │ External Gateways│
                │                │ Mock Providers   │
                │                └──────────────────┘
                ▼
     ┌────────────────────────┐
     │      Infrastructure    │
     │                        │
     │  Database → MySQL      │
     │  Cache → Redis         │
     │  Logger → Winston      │
     │  Config → ENV          │
     └────────────────────────┘
```

---

## 🧠 Visão Arquitetural

Fluxo geral:

Frontend
→ Routes
→ Controllers
→ UseCases
→ Repositories / Gateway Strategy
→ Infra (MySQL / Redis / External APIs)

---

## 💰 Fluxo de Pagamento (Detalhado)

Cliente
→ PaymentController
→ BuyProductUseCase
→ Gateway Strategy Pattern

1️⃣ Tenta Gateway 1
2️⃣ Falhou → tenta Gateway 2
3️⃣ Sucesso → salva transação no MySQL
4️⃣ Cache atualizado no Redis
5️⃣ Retorna resposta para o cliente

---

# 📦 Arquitetura da Aplicação

O projeto foi estruturado seguindo princípios de **Clean Architecture + Separation of Concerns**.

```
src
│
├── controllers
├── routes
├── usecases
├── repositories
├── gateways
├── middlewares
├── models
├── infra
│   ├── database
│   ├── cache
│   └── config
├── docs
└── server.ts
```

---

# 🧩 Diagrama Arquitetural

```
Client / Frontend
        │
        ▼
     Routes
        │
        ▼
   Controllers
        │
        ▼
     UseCases
        │
        ▼
   Repositories ─────► MySQL
        │
        ▼
 Gateway Strategy ───► External Gateways
        │
        ▼
       Cache (Redis)
```

---

# 💰 Fluxo de Pagamento

```
Cliente solicita compra
        │
        ▼
PaymentController
        │
        ▼
BuyProductUseCase
        │
        ▼
Gateway Strategy Pattern
   │
   ├─ Gateway 1
   │     └─ se falhar
   │
   └─ Gateway 2
         └─ sucesso → salva transação
```

---

# 🗄 Modelagem do Banco

### Users

* id
* name
* email
* password
* role

### Clients

* id
* name
* email

### Products

* id
* name
* amount

### Transactions

* id
* client_id
* gateway
* external_id
* status
* amount
* card_last_numbers

### Transaction_Products

* id
* transaction_id
* product_id
* quantity

### Gateways

* id
* name
* priority
* is_active

---

# 🔐 Controle de Acesso

| Role    | Permissões                    |
| ------- | ----------------------------- |
| ADMIN   | acesso total                  |
| MANAGER | gerenciar produtos e usuários |
| FINANCE | reembolsos                    |
| USER    | realizar compras              |

---

# 🔌 Gateways Simulados

O sistema integra com gateways mock:

```
http://localhost:3001
http://localhost:3002
```

---

# 📡 Principais Rotas

### 🔑 Login

POST /auth/login

```
{
  "email": "admin@betalente.com",
  "password": "123456"
}
```

---

### 📦 Listar Produtos

GET /products

---

### 🛒 Realizar Compra

POST /payments/purchase

```
{
  "client": {
    "name": "João",
    "email": "joao@email.com"
  },
  "products": [
    { "product_id": 1, "quantity": 2 }
  ],
  "card": {
    "number": "5569000000006063",
    "cvv": "010"
  }
}
```

---

### 💸 Reembolso

POST /payments/refund/:transactionId

---

# 📚 Documentação Swagger

Disponível em:

```
http://localhost:3000/docs
```

Permite:

* testar endpoints
* visualizar schemas
* simular requisições

---

# 🧪 Testes Automatizados

Executar:

```
npm test
```

Cobertura inclui:

* pagamentos
* autenticação
* rotas críticas

---

# 🐳 Executando com Docker

Subir toda infraestrutura:

```
docker-compose up --build
```

API disponível:

```
http://localhost:3000
```

---

# 💻 Executando Localmente

Instalar dependências:

```
npm install
```

Rodar aplicação:

```
npm run dev
```

---

# 🌱 Usuários Seed

ADMIN
[admin@betalente.com](mailto:admin@betalente.com)
123456

MANAGER
[manager@betalente.com](mailto:manager@betalente.com)

FINANCE
[finance@betalente.com](mailto:finance@betalente.com)

USER
[user@betalente.com](mailto:user@betalente.com)

---

# ⭐ Funcionalidades Implementadas

✔ Autenticação JWT
✔ Controle de papéis
✔ CRUD de produtos
✔ Sistema de compras
✔ Fallback automático de gateway
✔ Integração externa resiliente
✔ Cache Redis
✔ Rate Limit
✔ Swagger
✔ Testes automatizados
✔ Logger estruturado
✔ Docker ready

---

# 🏁 Checklist Final do Teste

✔ API sobe com Docker
✔ Banco sobe automaticamente
✔ Seed executado
✔ Login funciona
✔ Compra funciona
✔ Fallback de gateway validado
✔ Swagger acessível
✔ Testes passando
✔ Código organizado
✔ README completo

---

# 👩‍💻 Desenvolvido por

**Janine Tavares Cunha**
Backend Developer
