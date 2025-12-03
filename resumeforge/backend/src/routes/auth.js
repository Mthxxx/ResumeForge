const express = require('express');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const { prisma } = require('../config/database');
const { generateToken, authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Cliente Google OAuth
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ==================== REGISTRO ====================
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validações
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'A senha deve ter pelo menos 6 caracteres'
      });
    }

    // Verifica se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Este email já está cadastrado'
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Cria usuário
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        provider: 'email',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2F4A80&color=fff`
      }
    });

    // Gera token
    const token = generateToken(user.id);

    // Atualiza último login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          provider: user.provider
        },
        token
      }
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// ==================== LOGIN COM EMAIL/SENHA ====================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validações
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    // Busca usuário
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha incorretos'
      });
    }

    // Verifica se usuário tem senha (pode ter vindo do OAuth)
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: `Esta conta usa login com ${user.provider}. Use o botão correspondente.`
      });
    }

    // Verifica senha
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha incorretos'
      });
    }

    // Verifica se está ativo
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Conta desativada. Entre em contato com o suporte.'
      });
    }

    // Gera token
    const token = generateToken(user.id);

    // Atualiza último login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          provider: user.provider
        },
        token
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// ==================== LOGIN COM GOOGLE ====================
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Token do Google não fornecido'
      });
    }

    // Verifica o token com Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Busca usuário existente
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId },
          { email: email.toLowerCase() }
        ]
      }
    });

    if (user) {
      // Atualiza dados do Google se necessário
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: googleId,
          avatar: picture || user.avatar,
          lastLoginAt: new Date()
        }
      });
    } else {
      // Cria novo usuário
      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          googleId,
          avatar: picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2F4A80&color=fff`,
          provider: 'google',
          emailVerified: true
        }
      });
    }

    // Gera token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Login com Google realizado com sucesso',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          provider: user.provider
        },
        token
      }
    });

  } catch (error) {
    console.error('Erro no login Google:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao autenticar com Google'
    });
  }
});

// ==================== VERIFICAR TOKEN / GET USER ====================
router.get('/me', authenticateToken, async (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user
    }
  });
});

// ==================== LOGOUT (opcional - client-side) ====================
router.post('/logout', authenticateToken, async (req, res) => {
  // O logout é feito no client removendo o token
  // Aqui podemos adicionar lógica adicional se necessário
  res.json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
});

module.exports = router;








