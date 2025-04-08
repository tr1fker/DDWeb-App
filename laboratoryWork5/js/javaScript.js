let carData = [];
let currentId = 1;

function addRecord() {
    const series = document.getElementById('series').value;
    const releaseDate = document.getElementById('releaseDate').value;
    const purpose = document.getElementById('purpose').value;
    const manufacturerAddress = document.getElementById('manufacturerAddress').value;

    const car = {
    id: currentId++,
    series,
    releaseDate,
    purpose,
    manufacturerAddress
    };

    carData.push(car);
    updateTable();
    updateSelectOptions();
    clearForm();
}

function clearForm() {
    document.getElementById('series').value = '';
    document.getElementById('releaseDate').value = '';
    document.getElementById('purpose').value = '';
    document.getElementById('manufacturerAddress').value = '';
}

function updateTable() {
    const tbody = document.querySelector('#carTable tbody');
    tbody.innerHTML = '';

    carData.forEach(car => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${car.id}</td>
        <td>${car.series}</td>
        <td>${car.releaseDate}</td>
        <td>${car.purpose}</td>
        <td>${car.manufacturerAddress}</td>
    `;
    tbody.appendChild(row);
    });
}

function updateSelectOptions() {
    const select = document.getElementById('recordSelect');
    select.innerHTML = '<option disabled selected>Выберите ID</option>';
    carData.forEach(car => {
    const option = document.createElement('option');
    option.value = car.id;
    option.textContent = `ID ${car.id}`;
    select.appendChild(option);
    });
}

function deleteRecord() {
    const selectedId = parseInt(document.getElementById('recordSelect').value);
    carData = carData.filter(car => car.id !== selectedId);
    updateTable();
    updateSelectOptions();
}

function showAddressesByPurpose() {
    const inputPurpose = prompt("Введите назначение для поиска адресов:");
    if (!inputPurpose) return;

    const addresses = carData
    .filter(car => car.purpose.toLowerCase() === inputPurpose.toLowerCase())
    .map(car => car.manufacturerAddress);

    if (addresses.length) {
    alert("Адреса производителей по назначению \"" + inputPurpose + "\":\n" + addresses.join('\n'));
    } else {
    alert("Нет производителей с таким назначением.");
    }
}

function addNewProperty() {
    const text = document.getElementById('newProperty').value;
    const display = document.getElementById('newPropertyDisplay');
    display.textContent = "Новое свойство: " + text;
}