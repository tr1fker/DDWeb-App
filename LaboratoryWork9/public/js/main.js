document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const originalPage = document.getElementById('original-page');
    const processedPage = document.getElementById('processed-page');
    const originalCitiesList = document.getElementById('original-cities-list');
    const processedCitiesList = document.getElementById('processed-cities-list');
    const processButton = document.getElementById('process-button');
    const backButton = document.getElementById('back-button');
    
    // Добавляем индикатор загрузки
    originalCitiesList.innerHTML = '<li>Загрузка данных...</li>';
    
    // Fetch city data from the server
    fetch('/api/cities')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные успешно загружены:', data);
            
            if (!data.original || !data.processed || !data.original.length) {
                throw new Error('Некорректные данные от сервера');
            }
            
            // Display original cities
            displayCities(data.original, originalCitiesList, true);
            
            // Store processed cities for later display
            displayCities(data.processed, processedCitiesList, false);
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
            originalCitiesList.innerHTML = `<li class="error">Ошибка загрузки данных: ${error.message}</li>`;
        });
    
    // Function to display cities in a list
    function displayCities(cities, listElement, highlightLowercase) {
        listElement.innerHTML = '';
        
        if (!cities || !cities.length) {
            listElement.innerHTML = '<li class="error">Список городов пуст</li>';
            return;
        }
        
        cities.forEach(city => {
            const li = document.createElement('li');
            
            if (highlightLowercase && city.charAt(0) === city.charAt(0).toLowerCase() && 
                city.charAt(0) !== city.charAt(0).toUpperCase()) { // Check for lowercase first letter
                // Highlight cities with lowercase first letter
                const firstChar = document.createElement('span');
                firstChar.textContent = city.charAt(0);
                firstChar.classList.add('error');
                
                const restOfCity = document.createTextNode(city.slice(1));
                
                li.appendChild(firstChar);
                li.appendChild(restOfCity);
            } else {
                li.textContent = city;
            }
            
            listElement.appendChild(li);
        });
    }
    
    // Event listeners for buttons
    processButton.addEventListener('click', () => {
        originalPage.classList.remove('active');
        processedPage.classList.add('active');
    });
    
    backButton.addEventListener('click', () => {
        processedPage.classList.remove('active');
        originalPage.classList.add('active');
    });
}); 