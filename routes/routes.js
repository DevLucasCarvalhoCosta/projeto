const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const sessaoPlenariaController = require('../controllers/sessaoPlenariaController');
const protocoloController = require('../controllers/protocoloController');
const { verificarToken } = require('../middlewares/authMiddleware');


// Rotas para usuários
router.post('/usuarios', verificarToken, usuarioController.registrarUsuario);
router.get('/usuarios',  usuarioController.listarUsuarios);
router.get('/usuarios/:id', verificarToken, usuarioController.obterUsuarioPorId);
router.put('/usuarios/:id', verificarToken, usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', verificarToken, usuarioController.excluirUsuario);
router.post('/login', usuarioController.loginUsuario);

// Rotas para sessões plenárias
router.post('/sessoes-plenarias', verificarToken, sessaoPlenariaController.criarSessaoPlenaria);
router.get('/sessoesplenarias', verificarToken, sessaoPlenariaController.listarSessoesPlenarias);
router.get('/sessoesplenarias/:id/protocolos', verificarToken, sessaoPlenariaController.buscarProtocolosPorSessaoPlenaria);

// Rotas para protocolos
router.post('/protocolos', verificarToken, protocoloController.criarProtocolo);
router.get('/protocolos', verificarToken, protocoloController.listarProtocolos);
router.get('/protocolos/:id', verificarToken, protocoloController.obterProtocoloPorId);
router.put('/protocolos/:id', verificarToken, protocoloController.atualizarProtocolo);
router.delete('/protocolos/:id', verificarToken, protocoloController.excluirProtocolo);

module.exports = router;
