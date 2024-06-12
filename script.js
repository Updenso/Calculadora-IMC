const form = document.getElementById('form');
const refazerBtn = document.getElementById('refazer');
const limparBtn = document.getElementById('limpar');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    const bmi = (peso / (altura * altura)).toFixed(2);

    if (!isNaN(bmi)) {
        const value = document.getElementById('value');
        let description = '';

        value.classList.add('attention');
        document.getElementById('infos').classList.remove('hidden');

        if (bmi < 16) {
            description = 'abaixo do peso, nivel 3';
        } else if (bmi > 16 && bmi <= 17) {
            description = "abaixo do peso, nivel 2";
        } else if (bmi > 17 && bmi <= 16.5) {
            description = "abaixo do peso, nivel 1";
        } else if (bmi >= 18.5 && bmi <= 25) {
            description = "Você está no peso ideal!";
            value.classList.remove('attention');
            value.classList.add('normal');
        } else if (bmi > 25 && bmi <= 30) {
            description = "Cuidado! Você está com sobrepeso!";
        } else if (bmi > 30 && bmi <= 35) {
            description = "Cuidado! obesidade 1!";
        } else if (bmi > 35 && bmi <= 40) {
            description = "Cuidado! obesidade 2!";
        } else {
            description = "Cuidado! obesidade 3!";
        }

        value.textContent = bmi.replace('.', ',');
        document.getElementById('description').textContent = description;

        // Enviar o BMI para o servidor
        sendBmiToServer();
    }        
});

form.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('calculo').click();
    }
});

refazerBtn.addEventListener('click', function() {
    resetForm();
});

limparBtn.addEventListener('click', function() {
    clearForm();
});

function sendBmiToServer() {
    const bmi = parseFloat(document.getElementById('value').textContent.replace(',', '.'));
    const body = { bmi: bmi };

    fetch("http://localhost:3000/save-bmi", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data); // Log the response from the server
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error.message);
    });
}

function resetForm() {
    form.reset(); 
    document.getElementById('infos').classList.add('hidden'); 
    document.getElementById('value').textContent = ''; 
    document.getElementById('description').textContent = ''; 
    const value = document.getElementById('value');
    value.classList.remove('attention', 'normal'); 
}

function clearForm() {
    document.getElementById('peso').value = ''; 
    document.getElementById('altura').value = ''; 
    resetForm();
}
