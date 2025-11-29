# API Lanchonete

A **API Lanchonete** é uma aplicação Node.js construída com Express e
MongoDB destinada a gerenciar pedidos, produtos, clientes e
administradores de uma lanchonete.\
O projeto segue uma arquitetura organizada em **controllers**,
**models**, **routes**, **middlewares** e **validators**, garantindo
segurança, escalabilidade e manutenção simples.

------------------------------------------------------------------------

## Funcionalidades Principais

### **1. Autenticação**

-   Login de clientes e administradores.
-   Tokens JWT com níveis de permissão.
-   Rotas protegidas por middlewares (`authCliente` e `authAdmin`).

### **2. Gestão de Produtos**

-   CRUD completo de produtos.
-   Validações de entrada.
-   Apenas administradores podem criar, editar ou deletar produtos.

### **3. Gestão de Clientes**

-   Cadastro, login e listagem de clientes.
-   Apenas o cliente autenticado pode visualizar seus pedidos.

### **4. Pedidos**

-   Clientes podem criar pedidos com múltiplos itens.
-   O sistema calcula automaticamente o total do pedido.
-   Administradores podem atualizar status e gerenciar todos os pedidos.

------------------------------------------------------------------------

## Tecnologias Utilizadas

-   **Node.js**
-   **Express**
-   **MongoDB (Mongoose)**
-   **JWT (Json Web Token)**
-   **Nodemon**
-   **Validators com Express-Validator**
-   **Arquitetura MVC**

------------------------------------------------------------------------

## Estrutura do Projeto

    API-LANCHONETE
    ├── src
    │   ├── controllers
    │   ├── middlewares
    │   ├── models
    │   ├── routes
    │   ├── validators
    │   ├── app.js
    │   └── server.js
    ├── tests
    ├── .env
    ├── package.json
    └── README.md

------------------------------------------------------------------------

## Como Rodar o Projeto

### 1. Clonar o repositório

``` bash
git clone https://github.com/seuusuario/api-lanchonete.git
```

### 2. Instalar dependências

``` bash
npm install
```

### 3. Configurar o arquivo `.env`

Exemplo:

    PORT=3000
    MONGO_URI=mongodb://localhost:27017/lanchonete
    JWT_SECRET=seusegredo

### 4. Rodar o servidor

``` bash
npm run dev
```

------------------------------------------------------------------------

## Testes

O projeto inclui testes automatizados em:

    tests/

Para rodar:

``` bash
npm test
```

------------------------------------------------------------------------

## Problemas que não consegui resolver

- Develop ficou com problema

- Leve em consideração a Master
desenvolvimento de um sistema completo de lanchonete integrado a um
aplicativo mobile.

------------------------------------------------------------------------
