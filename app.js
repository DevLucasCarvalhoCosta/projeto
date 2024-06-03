require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const routes = require('./routes/routes');
const sequelize = require('./config/db.config');

const app = express();

// Middleware para permitir todas as origens
app.use(cors());

// Middleware para lidar com o upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Diretório onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Nome do arquivo
  }
});
const upload = multer({ storage: storage });

// Middleware para analisar o corpo da solicitação como JSON
app.use(express.json());

// Middleware para analisar o corpo da solicitação de formulário
app.use(express.urlencoded({ extended: true }));

// Middleware para lidar com o upload de arquivos em todas as rotas que precisam disso
app.use(upload.single('pdf')); // 'pdf' é o nome do campo no formulário de upload

// Usando o router para definir as rotas
app.use('/api', routes);

module.exports = app;
