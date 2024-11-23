// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db").db;  // Importando a conexão com o banco corretamente
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Carregar a chave secreta do ambiente
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta";

// Função para gerar token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware para autenticação de JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ error: "Acesso negado, token não fornecido" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }
    req.user = user;  // O usuário é adicionado ao `req`
    next();
  });
};

// Rota para buscar status de recarga
router.get("/charging_status", authenticateJWT, (req, res) => {
  const query = `SELECT * FROM charging_status WHERE user_id = ?`;

  db.all(query, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar status de recarga" });
    }
    res.status(200).json(rows);
  });
});

// Rota para buscar fontes de energia associadas ao usuário logado
router.get("/energy_sources", authenticateJWT, (req, res) => {
  const query = `SELECT * FROM energy_sources WHERE user_id = ?`;

  db.all(query, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar fontes de energia" });
    }
    res.status(200).json(rows);
  });
});

// Rota de cadastro de usuário (signup)
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Validação simples dos dados recebidos
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
  }

  // Verificar se o email já está cadastrado
  const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
  db.get(checkEmailQuery, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao verificar o email" });
    }
    if (row) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Criptografar a senha
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao criptografar a senha" });
      }

      const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
      db.run(query, [name, email, hashedPassword], function (err) {
        if (err) {
          return res.status(500).json({ error: "Erro ao cadastrar usuário" });
        }
        res.status(201).json({ id: this.lastID, name, email });
      });
    });
  });
});

// Rota de login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, row) => {
    if (err || !row) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }

    // Comparar a senha fornecida com a senha criptografada
    bcrypt.compare(password, row.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ error: "Credenciais inválidas" });
      }

      const token = generateToken(row);
      res.status(200).json({ id: row.id, email: row.email, token });
    });
  });
});

// Rota para adicionar novo status de recarga (POST)
router.post("/charging_status", authenticateJWT, (req, res) => {
  const { vehicle_id, status, progress } = req.body;

  // Validação simples
  if (!vehicle_id || !status || progress === undefined) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const query = `INSERT INTO charging_status (user_id, vehicle_id, status, progress) VALUES (?, ?, ?, ?)`;
  db.run(query, [req.user.id, vehicle_id, status, progress], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao adicionar status de recarga" });
    }
    res.status(201).json({ id: this.lastID, vehicle_id, status, progress });
  });
});

// Rota para adicionar nova fonte de energia (POST)
router.post("/energy_sources", authenticateJWT, (req, res) => {
  const { source_name, renewable } = req.body;

  if (!source_name) {
    return res.status(400).json({ error: "Nome da fonte de energia é obrigatório." });
  }

  const query = `INSERT INTO energy_sources (user_id, source_name, renewable) VALUES (?, ?, ?)`;
  db.run(query, [req.user.id, source_name, renewable], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao adicionar fonte de energia" });
    }
    res.status(201).json({ id: this.lastID, source_name, renewable });
  });
});

module.exports = router;