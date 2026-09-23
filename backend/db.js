const mysql = require('mysql2');

const connection = mysql.connection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'SQL_atividade'
});

connectio.connect((erro) => {
    if(erro){
        console.error('Erro ao se conectar ao banco de dados: ', erro.message);
    }else{
        console.log('Conexõa com o banco de dados SQL_atividade estabelecida com sucesso!!')
    }
})

module.exports = connection;