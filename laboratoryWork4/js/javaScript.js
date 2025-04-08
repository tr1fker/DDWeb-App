let surveyData = [];

function submitSurvey() {
    const name = document.getElementById('name').value;
    const shoppingTime = document.getElementById('shopping-time').value;
    const services = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(checkbox => checkbox.value);
    const paymentMethod = document.getElementById('payment-method').value;
    const visitFrequency = document.getElementById('visit-frequency').value;

    if (!name){
        alert("Укажите имя!");
        return;
    }
    if (!shoppingTime){
        alert("Укажите дату!");
        return;
    }
    if (!services.length){
        alert("Укажите услуги!");
        return;
    }
    if (!visitFrequency){
        alert("Укажите визиты!");
        return;
    }

    const surveyResponse = {
        name,
        shoppingTime,
        services: services.join(', '),
        paymentMethod,
        visitFrequency
    };

    surveyData.push(surveyResponse);

    clearSurvey();

    alert("Опрос успешно отправлен!");
}

function showResults() {
    const survey = document.getElementById('forma');
    survey.style = 'display: none';
    const tableBody = document.getElementById('surveyResults').getElementsByTagName('tbody')[0];

    tableBody.innerHTML = '';

    surveyData.forEach(response => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${response.name}</td>
        <td>${response.shoppingTime}</td>
        <td>${response.services}</td>
        <td>${response.paymentMethod}</td>
        <td>${response.visitFrequency}</td>
    `;
    tableBody.appendChild(row);
    });

    document.getElementById('resultsTable').style.display = 'block';
}

function showSurvey(){
    const tableBody = document.getElementById('resultsTable');
    tableBody.style = "display:none;";
    const survey = document.getElementById('forma');
    survey.style = "";
}

function clearSurvey(){
    document.getElementById('forma').reset();
}