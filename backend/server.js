const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const comprasRoute = require('./routes/compras');

require('dotenv').config();

const app = express();

// Middleware manual para garantir que o CORS funciona em todos os casos
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost',
    'http://localhost:8100',
    'http://localhost:4200',
    'capacitor://localhost',
    'http://localhost:8080',
    'https://391c-2001-8a0-dd04-600-ec9a-10ee-1f97-8207.ngrok-free.app'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Termina requisições preflight
  }

  next();
});

// Usa também o cors padrão como fallback (opcional)
app.use(cors({
  origin: [
    'http://localhost',
    'http://localhost:8100',
    'http://localhost:4200',
    'capacitor://localhost',
    'http://localhost:8080',
    'https://391c-2001-8a0-dd04-600-ec9a-10ee-1f97-8207.ngrok-free.app'
  ],
  credentials: true,
}));

app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Ligado ao MongoDB com sucesso'))
.catch((err) => console.error('❌ Erro ao ligar ao MongoDB:', err));

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/compras', comprasRoute);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor backend a funcionar 🚀');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor a correr em http://localhost:${PORT}`);
});
