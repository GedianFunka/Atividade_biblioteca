# Sistema de Biblioteca - API REST

## Objetivo do sistema

Sistema de gerenciamento de biblioteca desenvolvido para controlar o acervo de livros, os usuários cadastrados e os empréstimos realizados. A API permite cadastrar, consultar, atualizar e remover livros e usuários, além de registrar e acompanhar os empréstimos de livros feitos pelos usuários.

## Tecnologias utilizadas

- **Node.js** - ambiente de execução JavaScript no back-end
- **Express** - framework para criação das rotas da API
- **MySQL** - banco de dados relacional
- **mysql2** - driver de conexão do Node.js com o MySQL
- **cors** - liberação de requisições entre diferentes origens
- **Postman** - ferramenta utilizada para testar as requisições

## Requisitos funcionais

| Código | Requisito Funcional | Descrição |
|---|---|---|
| RF01 | Cadastro de Livro | O sistema deve permitir cadastrar um novo livro. |
| RF02 | Listagem de Livros | O sistema deve permitir listar todos os livros cadastrados. |
| RF03 | Consulta de Livro | O sistema deve permitir consultar os dados de um livro específico. |
| RF04 | Pesquisa de Livros | O sistema deve permitir pesquisar livros por título. |
| RF05 | Ordenação de Livros | O sistema deve permitir listar os livros em ordem alfabética por título. |
| RF06 | Edição de Livro | O sistema deve permitir editar os dados de um livro já cadastrado. |
| RF07 | Exclusão de Livro | O sistema deve permitir excluir um livro do acervo. |
| RF08 | Cadastro de Usuário | O sistema deve permitir cadastrar um novo usuário da biblioteca. |
| RF09 | Edição de Usuário | O sistema deve permitir editar os dados de um usuário já cadastrado. |
| RF10 | Exclusão de Usuário | O sistema deve permitir excluir um usuário. |
| RF11 | Registro de Empréstimo | O sistema deve permitir registrar o empréstimo de um livro a um usuário. |
| RF12 | Consulta de Empréstimos | O sistema deve permitir consultar os empréstimos realizados e seu status. |
| RF13 | Atualização de Empréstimo | O sistema deve permitir atualizar um empréstimo (ex: registrar a devolução). |

## Como configurar o banco de dados

1. Abra o MySQL Workbench (ou o cliente MySQL de sua preferência).
2. Execute o script `biblioteca_corrigido.sql` para criar o banco `SQL_atividade`, as tabelas (`livro`, `usuario`, `emprestimo`), as chaves primárias/estrangeiras e os dados de teste.
3. Confira se o banco foi criado corretamente:
   ```sql
   USE SQL_atividade;
   SHOW TABLES;
   ```
4. Crie o arquivo `db.js` na raiz do projeto com os dados de acesso ao seu banco:
   ```js
   const mysql = require('mysql2');

   const connection = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'root',
       database: 'SQL_atividade'
   });

   connection.connect((erro) => {
       if (erro) {
           console.error('Erro ao conectar ao banco de dados:', erro);
       } else {
           console.log('Conectado ao banco de dados com sucesso!');
       }
   });

   module.exports = connection;
   ```

## Como instalar as dependências

Com o Node.js instalado, execute na raiz do projeto:

```bash
npm install express cors mysql2
```

## Como executar o servidor

```bash
node app.js
```

O servidor sobe na porta **5500**. Adicione (caso ainda não tenha) no final do `app.js`:

```js
server.listen(5500, () => {
    console.log('Servidor rodando em http://localhost:5500');
});
```

## Rotas disponíveis

### Livros

| Método | Rota | Descrição |
|---|---|---|
| GET | `/livro` | Lista todos os livros |
| GET | `/livro/:id` | Consulta um livro pelo id |
| GET | `/livro/busca/:titulo` | Pesquisa livros pelo título |
| GET | `/livro/ordenados` | Lista os livros em ordem alfabética |
| POST | `/livro` | Cadastra um novo livro |
| PUT | `/livro/:id` | Atualiza um livro existente |
| DELETE | `/livro/:id` | Remove um livro |

### Usuários

| Método | Rota | Descrição |
|---|---|---|
| GET | `/usuario` | Lista todos os usuários |
| GET | `/usuario/:id` | Consulta um usuário pelo id |
| POST | `/usuario` | Cadastra um novo usuário |
| PUT | `/usuario/:id` | Atualiza um usuário existente |
| DELETE | `/usuario/:id` | Remove um usuário |

### Empréstimos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/emprestimo` | Lista todos os empréstimos |
| GET | `/emprestimo/:id` | Consulta um empréstimo pelo id |
| POST | `/emprestimo` | Registra um novo empréstimo |
| PUT | `/emprestimo/:id` | Atualiza um empréstimo (ex: registrar devolução) |

## Exemplos de requisições

### Cadastrar livro
`POST localhost:5500/livro`
```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "isbn": "9788508046004",
  "ano_publicacao": 1899,
  "categoria": "Romance",
  "quantidade": 4
}
```

### Atualizar livro
`PUT localhost:5500/livro/1`
```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "isbn": "9788508046004",
  "ano_publicacao": 1899,
  "categoria": "Romance",
  "quantidade": 5
}
```

### Pesquisar livro por título
`GET localhost:5500/livro/busca/dom`

### Cadastrar usuário
`POST localhost:5500/usuario`
```json
{
  "nome": "Gedian Silva",
  "cpf": "123.456.789-01",
  "email": "gedian.silva@email.com",
  "telefone": "(47) 99999-0001"
}
```

### Registrar empréstimo
`POST localhost:5500/emprestimo`
```json
{
  "id_livro": 1,
  "id_usuario": 1,
  "data_emprestimo": "2026-09-24",
  "data_prevista_devolucao": "2026-10-08",
  "status": "em andamento"
}
```

### Atualizar empréstimo (registrar devolução)
`PUT localhost:5500/emprestimo/1`
```json
{
  "data_emprestimo": "2026-09-24",
  "data_prevista_devolucao": "2026-10-08",
  "data_devolucao": "2026-10-05",
  "status": "devolvido"
}
```

### Deletar usuário
`DELETE localhost:5500/usuario/5`