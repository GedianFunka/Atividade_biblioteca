const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'SQL_atividade'
});

connection.connect((erro) => {
    if(erro){
        console.error('Erro ao se conectar ao banco de dados: ', erro.message);
    }else{
        console.log('Conexão com o banco de dados SQL_atividade estabelecida com sucesso!!')
    }
})

module.exports = connection;