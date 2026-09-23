const express = require ('express');
const cors = require ('cors');
const connection = require ('./db');

const server = express();
server.use(cors());
server.use(express.json());

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

server.get('/livro:id', (req, res) => {
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

