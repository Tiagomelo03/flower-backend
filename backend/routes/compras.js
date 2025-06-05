// routes/compras.js
const express = require('express');
const router = express.Router();
const Compra = require('../models/Compra');

router.post('/nova', async (req, res) => {
  try {
    const novaCompra = new Compra(req.body);
    await novaCompra.save();
    res.status(201).json({ message: 'Compra registada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Erro ao registar compra.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const compras = await Compra.find().sort({ createdAt: -1 }); // ← corrigido
    res.json(compras);
  } catch (err) {
    console.error('Erro ao buscar as compras:', err);
    res.status(500).json({ error: 'Erro ao buscar as compras.' });
  }
});

router.put('/:id/estado', async (req, res) => {
  const { estado } = req.body;
  try {
    const compra = await Compra.findByIdAndUpdate( // ← corrigido
      req.params.id,
      { estado },
      { new: true }
    );
    if (!compra) {
      return res.status(404).json({ error: 'Compra não encontrada.' });
    }
    res.json(compra);
  } catch (err) {
    console.error('Erro ao atualizar o estado:', err);
    res.status(500).json({ error: 'Erro ao atualizar o estado.' });
  }
});

module.exports = router;
