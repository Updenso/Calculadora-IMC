const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware para habilitar o CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configurações para o Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário MySQL
    password: 'root123', // Substitua pela sua senha MySQL
    database: 'bmi_db'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Rota para salvar o BMI
app.post('/save-bmi', (req, res) => {
    const bmi = req.body.bmi;

    const query = `INSERT INTO bmi_results (bmi) VALUES (?)`;
    db.query(query, [bmi], (err, result) => {
        if (err) {
            console.error(err.message); // Log the error for debugging
            return res.status(500).json({ message: 'Error saving BMI' }); // Send an error response to the client
        }
        res.json({ message: 'BMI saved successfully!', id: result.insertId });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:3000/`);
});
