// backend/db.js
const sqlite3 = require('sqlite3').verbose();

// Criação do banco de dados, se não existir
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Função para criar tabelas
const createTables = () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS charging_status (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vehicle_id TEXT NOT NULL,
      status TEXT NOT NULL,
      progress INTEGER NOT NULL DEFAULT 0,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS energy_sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_name TEXT NOT NULL,
      renewable BOOLEAN NOT NULL DEFAULT 0,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  ];

  // Executar todas as queries de criação de tabelas
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      queries.forEach((query) => {
        db.run(query, (err) => {
          if (err) {
            reject(err);
          }
        });
      });
      resolve();
    });
  });
};

// Função para fechar a conexão com o banco de dados
const closeConnection = () => {
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão com o banco de dados:', err.message);
    } else {
      console.log('Conexão com o banco de dados fechada.');
    }
  });
};

// Criação das tabelas assim que o módulo for carregado
createTables()
  .then(() => {
    console.log('Tabelas criadas ou verificadas com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao criar as tabelas:', err.message);
  });

module.exports = { db, closeConnection, createTables };