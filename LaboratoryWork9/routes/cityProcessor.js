/**
 * Module for processing city names
 */

// Sample array of city names (some with lowercase first letters)
const cities = [
  'москва', 
  'Санкт-Петербург', 
  'новосибирск', 
  'Екатеринбург', 
  'нижний Новгород', 
  'Казань', 
  'самара', 
  'Омск', 
  'ростов-на-Дону', 
  'Уфа', 
  'красноярск', 
  'Воронеж', 
  'пермь'
];

/**
 * Function to capitalize the first letter of each city name
 * @returns {Object} Object containing original and processed arrays
 */
function processCities() {
  const originalCities = [...cities];
  
  // Capitalize first letter of each city and sort alphabetically
  const processedCities = cities.map(city => {
    return city.charAt(0).toUpperCase() + city.slice(1);
  }).sort();
  
  return {
    original: originalCities,
    processed: processedCities
  };
}

module.exports = { processCities }; 