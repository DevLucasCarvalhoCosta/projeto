const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.verificarToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token de autorização não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Payload decodificado:', decoded);

    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário associado ao token não encontrado' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return res.status(401).json({ erro: 'Token de autorização inválido' });
  }
};

module.exports = exports;
