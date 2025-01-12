const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para permitir CORS
app.use(cors());

// Rota para obter gatinhos aleatórios
app.get('/api/cats', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search');
    const catData = response.data;
    res.json({ cat: catData[0].url });
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    res.status(500).json({ error: 'Não foi possível obter dados da API' });
  }
});

// Serve arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../react-teste/build')));

// Redireciona todas as outras requisições para o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-teste/build', 'index.html'));
});
console.log(path.join(__dirname, '../react-teste/build', 'index.html'));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
