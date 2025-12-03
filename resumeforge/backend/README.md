# ResumeForge Backend

Backend da aplicação ResumeForge com autenticação JWT e Google OAuth.

## Tecnologias

- **Node.js** + **Express** - Servidor
- **Prisma** - ORM
- **PostgreSQL** (Neon) - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **Google Auth Library** - OAuth com Google

## Configuração

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente

Renomeie o arquivo `env.txt` para `.env`:

```bash
# Windows
rename env.txt .env

# Linux/Mac
mv env.txt .env
```

### 3. Configurar o banco de dados

Execute os comandos do Prisma para criar as tabelas:

```bash
# Gera o cliente Prisma
npm run prisma:generate

# Sincroniza o schema com o banco
npm run prisma:push
```

### 4. Iniciar o servidor

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3001`

## Endpoints da API

### Health Check
- `GET /api/health` - Verifica se a API está funcionando

### Autenticação
- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/login` - Login com email/senha
- `POST /api/auth/google` - Login com Google OAuth
- `GET /api/auth/me` - Obtém dados do usuário autenticado
- `POST /api/auth/logout` - Logout

## Estrutura do Projeto

```
backend/
├── prisma/
│   └── schema.prisma     # Schema do banco de dados
├── src/
│   ├── config/
│   │   └── database.js   # Configuração do Prisma
│   ├── middleware/
│   │   └── auth.js       # Middleware de autenticação JWT
│   ├── routes/
│   │   └── auth.js       # Rotas de autenticação
│   └── server.js         # Servidor Express
├── .gitignore
├── env.txt               # Variáveis de ambiente (renomear para .env)
├── package.json
└── README.md
```

## Configuração do Google OAuth

Para que o login com Google funcione, você precisa:

1. Acessar o [Google Cloud Console](https://console.cloud.google.com/)
2. Ir em **APIs & Services** > **Credentials**
3. Adicionar as URLs autorizadas:
   - **Authorized JavaScript origins**: `http://localhost:5173`
   - **Authorized redirect URIs**: `http://localhost:5173`

## Prisma Studio

Para visualizar e editar dados no banco:

```bash
npm run prisma:studio
```

Abrirá em `http://localhost:5555`








