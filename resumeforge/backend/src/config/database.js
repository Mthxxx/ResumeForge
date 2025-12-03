const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Testa a conexão ao iniciar
async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ Conectado ao banco de dados PostgreSQL (Neon)');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}

module.exports = { prisma, connectDB };








