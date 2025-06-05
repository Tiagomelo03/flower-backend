const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  titulo: String,
  quantidade: Number,
  preco: Number,
  imagem: String
});

const CompraSchema = new mongoose.Schema({
  utilizadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itens: [ItemSchema],
  dadosEntrega: {
    nome: String,
    morada: String,
    apartamento: String,
    cidade: String,
    codPostal: String,
    pais: String,
    regiao: String,
    telemovel: String,
    email: String
  },
  metodoPagamento: {
    type: String,
    enum: ['Cartao', 'PayPal'],
    required: true
  },
  cartao: {
    titular: String,
    numero: String,
    validade: String,
    cvv: String
  },
  total: Number,
  dataCompra: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['Pendente', 'Aceite', 'Recusado'],
    default: 'Pendente'
  }
});

module.exports = mongoose.model('Compra', CompraSchema);
