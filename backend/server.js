const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");  // Corrigido para carregar apenas uma vez

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do servidor e da aplicação Express
const app = express();
const port = process.env.PORT || 5000;  // Utilizar a porta do ambiente ou a porta 5000 como fallback

// Middleware de segurança
app.use(helmet());

// Middleware de logs HTTP (para desenvolvimento)
app.use(morgan("dev"));

// Middleware para CORS (permite conexões de origens diferentes)
app.use(cors());

// Middleware para parsing de JSON (substituindo o bodyParser.json())
app.use(express.json());

// Definindo as rotas de autenticação
app.use("/api/auth", authRoutes);  // Corrigido para usar apenas a rota de autenticação

// Middleware global de erro (toda vez que ocorrer um erro, esse middleware vai ser acionado)
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log do erro no servidor

  // Enviar resposta de erro (não enviar detalhes sensíveis para o usuário)
  res.status(500).send({ message: "Algo deu errado, tente novamente mais tarde!" });
});

// Iniciar o servidor e escutar na porta configurada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});