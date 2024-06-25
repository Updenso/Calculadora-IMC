const express = require('express');
const bodyParser = require('body-parser');
const { db, getConnection } = require('./config/database')

const app = express();
const port = 3000;

// Configurações para o Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
