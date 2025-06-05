const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

// Registo de novo utilizador
router.post('/register', async (req, res) => {
  try {
    const { nome, email, username, password } = req.body;

    // Verifica se já existe
    const existe = await User.findOne({ username });
    if (existe) {
      return res.status(400).json({ error: 'Nome de utilizador já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const novoUser = new User({ nome, email, username, password: hashedPassword });
    await novoUser.save();

    res.status(201).json({ message: 'Utilizador registado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no registo' });
  }
});

// Login de utilizador
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: 'Utilizador não encontrado' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: 'Senha incorreta' });
  }

  const { password: _, ...userSemPassword } = user.toObject();
  res.json({ user: userSemPassword });
});

module.exports = router;
