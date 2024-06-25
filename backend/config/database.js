const mysql = require('mysql2/promise');

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário MySQL
    password: 'root123', // Substitua pela sua senha MySQL
    database: 'bmi_db'
});

async function getConnection() {
    try {
        const connection = await db.getConnection();
        console.log('Conexão bem sucedida ao banco de dados MySQL');
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
}

module.exports = {
    db, getConnection
};