const express = require ('express');
const cors = require ('cors');
const connection = require ('./db');

const server = express();
server.use(cors());
server.use(express.json());

//Rota da tabela livro para buscar todos os livros, por id, titulo, listar em ordem alfabética, cadastrar, atualizar e deletar

server.get('/livro', (req, res) => {
    const sql = 'SELECT * FROM LIVRO';
    
    connection.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json(resultado);
        }
    });
});

server.get('/livro/ordenados', (req, res) => {
    const sql = 'SELECT * FROM livro ORDER BY titulo';

    connection.query(sql, (erro, resultado) =>{
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json(resultado);
        }
    });
});

server.get('/livro/:id', (req, res) => {
    const {id} = req.params;

    const sql = 'SELECT * FROM LIVRO WHERE id_livro = ?';

    connection.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json(resultado[0]);
        }
    });
});

server.get('/livro/busca/:titulo', (req, res) => {
    const sql = 'SELECT * FROM LIVRO WHERE titulo LIKE ?';

    const termoBusca = '%' + req.params.titulo + '%';

    connection.query(sql, [termoBusca], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json(resultado);
        }
    });
});

server.post('/livro', (req, res) => {
    const {titulo, autor, isbn, ano_publicacao, categoria, quantidade} = req.body;

    const sql = 'INSERT INTO LIVRO (titulo, autor, isbn, ano_publicacao, categoria, quantidade) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(sql, [titulo, autor, isbn, ano_publicacao, categoria, quantidade], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json({mensagem: 'Livro cadastrado com sucesso', id_livro: resultado.insertId});
        }
    })
})

server.put('/livro/:id', (req, res) => {
    const {id} = req.params;
    const {titulo, autor, isbn, ano_publicacao, categoria, quantidade} = req.body;

    const sql = 'UPDATE LIVRO SET titulo = ?, autor = ?, isbn = ?, ano_publicacao = ?, categoria = ?, quantidade = ? WHERE id_livro = ?';

    connection.query(sql, [titulo, autor, isbn, ano_publicacao, categoria, quantidade, id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json({mensagem: 'Livro atualizado com sucesso'});
        }
    });
});

server.delete('/livro/:id', (req, res) => {
    const {id} = req.params;

    const sql = 'DELETE FROM LIVRO WHERE id_livro = ?';

    connection.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json({mensagem: 'Livro deletado com sucesso'});
        }
    });
});

//Rota da tabela usuário para buscar todos os usuários, por id, cadastrar, atualizar e deletar
server.get('/usuario', (req, res) => {
    const sql = 'SELECT * FROM USUARIO';

    connection.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json(resultado);
        }
    });
});

server.get('/usuario/:id', (req, res) => {
    const {id} = req.params;

    const sql = 'SELECT * FROM USUARIO WHERE id_usuario = ?';

    connection.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json(resultado);
        }
    });
});

server.post('/usuario', (req, res) => {
    const {nome, cpf, email, telefone} = req.body;

    const sql = 'INSERT INTO USUARIO (nome, cpf, email, telefone) VALUES (?, ?, ?, ?)';

    connection.query(sql, [nome, cpf, email, telefone], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro:erro.mensagem });
        }else{
            res.json({mensagem: 'Usuário cadastrado com sucesso', id_usuario: resultado.insertId});
        }
    });
});

server.put('/usuario/:id', (req, res) => {
    const {nome, cpf, email, telefone} = req.body;
    const {id} = req.params;

    const sql = 'UPDATE USUARIO SET nome = ?, cpf = ?, email = ?, telefone = ? WHERE id_usuario = ?';

    connection.query(sql, [nome, cpf, email, telefone, id],(erro, resultado) =>{
        if(erro){
            return res.status(500).json({ erro: erro.mensagem })
        }else{
            res.json({ mensagem: 'Usuário atualizado com sucesso!'})

        }
    });
});

server.delete('/usuario/:id' , (req, res) => {
    const {id} = req.params;

    const sql = 'DELETE FROM USUARIO WHERE id_usuario = ? ';

    connection.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.mensagem})
        }else{
            res.json({ mensagem: 'Usuário deletado com sucesso!'})
        }
    })
})

//Rota da tabela emprestimo para buscar todos os emprestimos, por id, cadastrar e atualizar
server.get('/emprestimo', (req, res) => {
    const sql = 'SELECT * FROM EMPRESTIMO';
 
    connection.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json(resultado);
        }
    });
});
 
server.get('/emprestimo/:id', (req, res) => {
    const {id} = req.params;
 
    const sql = 'SELECT * FROM EMPRESTIMO WHERE id_emprestimo = ?';
 
    connection.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json(resultado[0]);
        }
    });
});
 
server.post('/emprestimo', (req, res) => {
    const {id_livro, id_usuario, data_emprestimo, data_prevista_devolucao, status} = req.body;
 
    const sql = 'INSERT INTO EMPRESTIMO (id_livro, id_usuario, data_emprestimo, data_prevista_devolucao, status) VALUES (?, ?, ?, ?, ?)';
 
    connection.query(sql, [id_livro, id_usuario, data_emprestimo, data_prevista_devolucao, status], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json({mensagem: 'Empréstimo cadastrado com sucesso', id_emprestimo: resultado.insertId});
        }
    });
});
 
server.put('/emprestimo/:id', (req, res) => {
    const {id} = req.params;
    const {data_emprestimo, data_prevista_devolucao, data_devolucao, status} = req.body;
 
    const sql = 'UPDATE EMPRESTIMO SET data_emprestimo = ?, data_prevista_devolucao = ?, data_devolucao = ?, status = ? WHERE id_emprestimo = ?';
 
    connection.query(sql, [data_emprestimo, data_prevista_devolucao, data_devolucao, status, id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }else{
            res.json({mensagem: 'Empréstimo atualizado com sucesso'});
        }
    });
});

server.listen(5500, () => {
    console.log('Servidor rodando na porta 5500');
});