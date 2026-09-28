# Cinebridge

API HTTP para cadastro de profissionais e projetos audiovisuais.

## Tecnologias necessárias

Para executar o projeto localmente você precisa de:

| Tecnologia | Uso |
| --- | --- |
| [Node.js](https://nodejs.org/) 24 ou superior | Runtime da API (o `tsconfig.json` está alinhado ao Node 24) |
| [npm](https://www.npmjs.com/) | Instalação de dependências e scripts |
| [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) | Banco PostgreSQL em container |
| [Git](https://git-scm.com/) | Clone do repositório |

Stack da aplicação (já instalada via `npm install`):

- **TypeScript** — compilação para JavaScript (`tsc`)
- **Fastify** — servidor HTTP
- **Zod** — validação de ambiente e de corpo das requisições
- **Prisma** + **PostgreSQL 17** — persistência
- **Vitest** — testes (dependência de desenvolvimento)

## Configuração

1. Clone o repositório e entre na pasta do projeto.

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo de ambiente de desenvolvimento a partir do exemplo:

```bash
cp .env.example .env.development
```

O servidor carrega `.env.${NODE_ENV}`. O script `npm run dev` define `NODE_ENV=development`, então o arquivo esperado é `.env.development`.

4. Preencha as variáveis:

```
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=
DATABASE_URL="postgresql://user:password@host:5432/db?schema=public"
SERVER_PORT=
```

- `POSTGRES_*` são usadas pelo container em `infra/compose.yaml`.
- `DATABASE_URL` é a conexão usada pelo Prisma e pela API (mesmo usuário, senha, host e banco).
- `SERVER_PORT` é a porta HTTP (por exemplo `3000`). Em desenvolvimento o host do Postgres no `DATABASE_URL` costuma ser `localhost`.

## Execução

### Banco de dados

Sobe o PostgreSQL, espera o container aceitar conexões, aplica as migrations e gera o client do Prisma:

```bash
npm run db:up
```

Para apenas parar o container (sem remover o volume de dados):

```bash
npm run db:stop
```

### API

Compila o TypeScript e inicia o servidor com recarga automática:

```bash
npm run dev
```

A API escuta em `0.0.0.0` na porta definida em `SERVER_PORT`.

Verificação rápida:

```bash
curl http://localhost:3000/health
```

Resposta esperada: `{"status":"ok"}`.

Rotas principais:

- `POST /profissional` — cria um profissional
- `POST /projeto` — cria um projeto

### Testes

```bash
npx vitest
```
