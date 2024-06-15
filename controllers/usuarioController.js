const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { logAction } = require('../controllers/Logger'); // Importe a função logAction
const Perfil = require('../models/Perfil');


// Função para registrar um novo usuário
exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha, cargo, cpf, perfilId } = req.body;

  // Verifique se os campos obrigatórios foram fornecidos
  if (!nome || !email || !senha || !cargo || !cpf || !perfilId) {
    return res.status(400).json({ erro: 'Nome, email, senha, cargo, CPF e perfilId são obrigatórios' });
  }

  try {
    // Verificar se o email já está em uso
    const emailExistente = await Usuario.findOne({ where: { email } });
    if (emailExistente) {
      return res.status(400).json({ erro: 'Este email já está em uso' });
    }

    // Verificar se o CPF já está em uso
    const cpfExistente = await Usuario.findOne({ where: { cpf } });
    if (cpfExistente) {
      return res.status(400).json({ erro: 'Este CPF já está em uso' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar um novo usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      cargo,
      telefone: req.body.telefone || null,
      dataNascimento: req.body.dataNascimento || null,
      genero: req.body.genero || null,
      endereco: req.body.endereco || null,
      cpf,
      perfilId
    });

    // Verifique se req.usuario está definido
    if (!req.usuario || !req.usuario.id) {
      console.error('req.usuario ou req.usuario.id está indefinido');
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }

    // Registre a ação no log
    await logAction(req.usuario.id, 'Registrar Usuário', `Usuário ${novoUsuario.nome} registrado com sucesso`);

    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Função para fazer login de usuário
exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    const usuario = await Usuario.findOne({
      where: { email },
      include: { model: Perfil }
    });
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const senhaCorrespondente = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorrespondente) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, perfil: usuario.Perfil.nome },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Função para recuperar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Função para recuperar um usuário pelo ID
exports.obterUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    } else {
      res.status(200).json(usuario);
    }
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Função para atualizar um usuário pelo ID
exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [rowsUpdated] = await Usuario.update(req.body, {
      where: { id },
    });
    if (rowsUpdated === 0) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    } else {
      const usuarioAtualizado = await Usuario.findByPk(id);

      // Registre a ação no log
      await logAction(req.usuario.id, 'Atualizar Usuário', `Usuário ${usuarioAtualizado.nome} atualizado com sucesso`);

      res.status(200).json(usuarioAtualizado);
    }
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Função para excluir um usuário pelo ID
exports.excluirUsuario = async (req, res) => {
  const { id } = req.params;
  
  // Verifique se o id foi fornecido
  if (!id) {
    return res.status(400).json({ erro: 'ID do usuário não fornecido' });
  }

  try {
    // Encontre o usuário para garantir que ele existe
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    // Destrua o usuário encontrado
    await Usuario.destroy({ where: { id } });

    // Verifique se req.usuario está definido
    if (!req.usuario || !req.usuario.id) {
      console.error('req.usuario ou req.usuario.id está indefinido');
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }

    // Registre a ação no log
    await logAction(req.usuario.id, 'Excluir Usuário', `Usuário ID: ${id} excluído com sucesso`);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};