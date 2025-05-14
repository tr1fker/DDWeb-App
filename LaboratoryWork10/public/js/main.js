document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const citiesInput = document.getElementById('citiesInput');
    const processCitiesBtn = document.getElementById('processCitiesBtn');
    const showOriginalBtn = document.getElementById('showOriginalBtn');
    const showProcessedBtn = document.getElementById('showProcessedBtn');
    const originalList = document.getElementById('originalList');
    const processedList = document.getElementById('processedList');
    
    // Event Listeners
    processCitiesBtn.addEventListener('click', processCities);
    showOriginalBtn.addEventListener('click', showOriginalCities);
    showProcessedBtn.addEventListener('click', showProcessedCities);
    
    // Process cities function
    async function processCities() {
        const citiesText = citiesInput.value.trim();
        if (!citiesText) {
            alert('Пожалуйста, введите названия городов');
            return;
        }
        
        // Split by newline and filter out empty lines
        const cities = citiesText.split('\n').filter(city => city.trim());
        
        try {
            const response = await fetch('/save-cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cities })
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert('Города успешно обработаны и сохранены!');
            } else {
                alert('Произошла ошибка при обработке городов.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка при обработке городов.');
        }
    }
    
    // Display original cities
    async function showOriginalCities() {
        try {
            const response = await fetch('/get-original-cities');
            const data = await response.json();
            
            if (data.cities && data.cities.length > 0) {
                displayCities(originalList, data.cities);
            } else {
                originalList.innerHTML = '<p>Нет данных для отображения. Сначала обработайте список городов.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            originalList.innerHTML = '<p>Ошибка при загрузке данных.</p>';
        }
    }
    
    // Display processed cities
    async function showProcessedCities() {
        try {
            const response = await fetch('/get-processed-cities');
            const data = await response.json();
            
            if (data.cities && data.cities.length > 0) {
                displayCities(processedList, data.cities);
            } else {
                processedList.innerHTML = '<p>Нет данных для отображения. Сначала обработайте список городов.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            processedList.innerHTML = '<p>Ошибка при загрузке данных.</p>';
        }
    }
    
    // Helper function to display cities as numbered list
    function displayCities(container, cities) {
        const ol = document.createElement('ol');
        
        cities.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city;
            ol.appendChild(li);
        });
        
        container.innerHTML = '';
        container.appendChild(ol);
    }
});
