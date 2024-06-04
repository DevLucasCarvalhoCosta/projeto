require('dotenv').config(); // Certifique-se de que isso está no início do arquivo
const express = require('express');
const path = require('path');
const app = require('./app'); // Importa o app com suas configurações de rotas e middlewares

// Configura o middleware para servir arquivos estáticos na pasta uploads
app.use('/uploads/', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
