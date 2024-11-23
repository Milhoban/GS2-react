# GS - Gestão de Energia

## Visão Geral

A **Gestão de Energia** é uma aplicação web focada no gerenciamento de recargas de veículos e fontes de energia, com ênfase em soluções sustentáveis e eficientes. O sistema permite aos usuários visualizar o status de recargas, registrar novas fontes de energia e acompanhar o progresso das recargas de forma fácil e intuitiva.

Com a combinação de um backend em **Node.js** e **SQLite** e um frontend moderno utilizando **React**, esta aplicação oferece uma interface interativa e fácil de usar, além de um backend robusto e eficiente.

### Funcionalidades Principais

- **Cadastro e Login de Usuários**: Sistema de autenticação seguro via JWT (JSON Web Tokens).
- **Gerenciamento de Recargas**: Adicionar, visualizar e atualizar o status das recargas de veículos.
- **Cadastro de Fontes de Energia**: Registrar fontes de energia renováveis e não renováveis.
- **Visualização Dinâmica**: Exibição de status de recarga e fontes de energia em listas e gráficos interativos.

## Tecnologias Utilizadas

### Backend

- **Node.js**: Ambiente de execução para o JavaScript no servidor.
- **Express.js**: Framework web para criar a API de forma rápida e flexível.
- **SQLite**: Banco de dados leve para persistência de dados.
- **JWT (JSON Web Token)**: Utilizado para autenticação segura de usuários.
- **CORS**: Permite comunicação entre o frontend e o backend em diferentes origens.

### Frontend

- **React**: Biblioteca JavaScript para construção de interfaces de usuário dinâmicas.
- **CSS-in-JS (Estilos em JS)**: Utilizado para estilização modular e reutilizável dos componentes.
- **React Router**: Para gerenciar a navegação entre diferentes páginas da aplicação.

## Instalação e Execução

### Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter o **Node.js** instalado em sua máquina. Caso não tenha, você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).

## Instalação e Execução

### Passos para executar o backend e o frontend

1. Clone o repositório ou faça o download do projeto.

2. Navegue até a pasta do projeto **monitoring_system** no seu terminal:
    ```bash
    cd monitoring_system
    ```

3. Instale as dependências para o backend e frontend:
    ```bash
    npm install
    ```
2. Navegue até a pasta do projeto **frontend** no seu terminal:
    ```bash
    cd frontend
    ```

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```

   O projeto estará disponível no endereço `http://localhost:3000`.
