require('dotenv').config(); // Certifique-se de que isso está no início do arquivo

const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload'); // Importa o express-fileupload
const routes = require('./routes/routes'); // Ajuste o caminho conforme necessário

const app = express();

// Middleware para permitir todas as origens
app.use(cors()); // Permite todas as origens

// Middleware para manipulação de arquivos
app.use(fileUpload());

// Outros middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usando o router para definir as rotas
app.use('/api', routes); // Prefixo '/api' para todas as rotas

module.exports = app;