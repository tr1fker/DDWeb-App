// Parent class for Transportation Services
class TransportationServices {
    // Constructor 1: Default constructor with empty data
    constructor() {
        this.servicesMap = new Map();
        this.descriptionsMap = new Map();
        this.setupDefaultData();
    }

    // Constructor 2: Constructor with provided services
    static withCustomServices(services) {
        const instance = new TransportationServices();
        
        if (services && services instanceof Map) {
            instance.servicesMap = new Map(services);
        }
        
        return instance;
    }

    // Constructor 3: Constructor with both services and descriptions
    static withCustomData(services, descriptions) {
        const instance = new TransportationServices();
        
        if (services && services instanceof Map) {
            instance.servicesMap = new Map(services);
        }
        
        if (descriptions && descriptions instanceof Map) {
            instance.descriptionsMap = new Map(descriptions);
        }
        
        return instance;
    }

    // Setup default data for services and descriptions
    setupDefaultData() {
        // Services data
        this.servicesMap.set(0, [
            "Excavator material removal",
            "Concrete transport",
            "Brick and block delivery",
            "Timber and lumber transport"
        ]);
        
        this.servicesMap.set(1, [
            "Complete office relocations",
            "Equipment transport",
            "Document archives moving",
            "Furniture assembly and transport"
        ]);
        
        this.servicesMap.set(2, [
            "Retail product delivery",
            "Warehouse to store transport",
            "Cold chain logistics",
            "Express package delivery"
        ]);
        
        // Descriptions data
        this.descriptionsMap.set(0, "Professional construction materials transport with specialized equipment");
        this.descriptionsMap.set(1, "Efficient and careful office moving services");
        this.descriptionsMap.set(2, "Reliable goods delivery with tracking and insurance");
    }

    // Method 1: Render services to DOM
    renderServices(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        // Create category titles
        const categories = ["Construction Materials Transport", "Office Relocation", "Goods Delivery"];
        
        for (let i = 0; i < 3; i++) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'service-category';
            categoryDiv.id = `category-${i}`;
            
            // Create title
            const title = document.createElement('h2');
            title.textContent = categories[i];
            categoryDiv.appendChild(title);
            
            // Create ordered list of services
            const servicesList = document.createElement('ol');
            const services = this.servicesMap.get(i) || [];
            
            services.forEach(service => {
                const listItem = document.createElement('li');
                listItem.textContent = service;
                servicesList.appendChild(listItem);
            });
            
            categoryDiv.appendChild(servicesList);
            
            // Create description paragraph
            const description = document.createElement('p');
            description.textContent = this.descriptionsMap.get(i) || '';
            categoryDiv.appendChild(description);
            
            container.appendChild(categoryDiv);
        }
    }

    // Method 2: Get services as dropdown options
    getServicesAsDropdown(selectElementId) {
        const selectElement = document.getElementById(selectElementId);
        if (!selectElement) return;
        
        selectElement.innerHTML = '';
        
        this.servicesMap.forEach((services, key) => {
            const optGroup = document.createElement('optgroup');
            optGroup.label = ["Construction Materials", "Office Relocation", "Goods Delivery"][key];
            
            services.forEach((service, index) => {
                const option = document.createElement('option');
                option.value = `${key}-${index}`;
                option.textContent = service;
                optGroup.appendChild(option);
            });
            
            selectElement.appendChild(optGroup);
        });
    }

    // Method 3: Display services as text
    getServicesAsText() {
        let result = '';
        
        this.servicesMap.forEach((services, key) => {
            const categoryName = ["Construction Materials", "Office Relocation", "Goods Delivery"][key];
            result += `${categoryName}:\n`;
            
            services.forEach((service, index) => {
                result += `${index + 1}. ${service}\n`;
            });
            
            result += `\n`;
        });
        
        return result;
    }
}

// Child class for Extended Transportation Services
class ExtendedTransportationServices extends TransportationServices {
    constructor() {
        super(); // Call parent constructor
    }

    // Method 1: Add a new service to a specific list
    addService(listIndex, serviceName) {
        if (serviceName.trim() === '') return false;
        
        if (this.servicesMap.has(Number(listIndex))) {
            const services = this.servicesMap.get(Number(listIndex));
            services.push(serviceName);
            this.servicesMap.set(Number(listIndex), services);
            return true;
        }
        
        return false;
    }

    // Method 2: Add a new description before the existing paragraph for a specific category
    addDescriptionBefore(categoryIndex, description) {
        if (description.trim() === '') return false;
        
        const categoryContainer = document.getElementById(`category-${categoryIndex}`);
        if (!categoryContainer) return false;
        
        const paragraph = categoryContainer.querySelector('p');
        if (!paragraph) return false;
        
        const newParagraph = document.createElement('p');
        newParagraph.textContent = description;
        
        categoryContainer.insertBefore(newParagraph, paragraph);
        return true;
    }

    // Method 3: Add a new description after the existing paragraph for a specific category
    addDescriptionAfter(categoryIndex, description) {
        if (description.trim() === '') return false;
        
        const categoryContainer = document.getElementById(`category-${categoryIndex}`);
        if (!categoryContainer) return false;
        
        const paragraph = categoryContainer.querySelector('p');
        if (!paragraph) return false;
        
        const newParagraph = document.createElement('p');
        newParagraph.textContent = description;
        
        // Insert after the existing paragraph
        if (paragraph.nextSibling) {
            categoryContainer.insertBefore(newParagraph, paragraph.nextSibling);
        } else {
            categoryContainer.appendChild(newParagraph);
        }
        
        return true;
    }
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create an instance of the extended services class
    const transportationServices = new ExtendedTransportationServices();
    
    // Render the services to the container
    transportationServices.renderServices('services-container');
    
    // Event listener for adding a new service
    document.getElementById('add-service-btn').addEventListener('click', function() {
        const listIndex = document.getElementById('service-list-select').value;
        const serviceName = document.getElementById('service-input').value;
        
        if (transportationServices.addService(listIndex, serviceName)) {
            transportationServices.renderServices('services-container');
            document.getElementById('service-input').value = '';
        } else {
            alert('Please enter a valid service name');
        }
    });
    
    // Event listener for adding a new description
    document.getElementById('add-desc-btn').addEventListener('click', function() {
        const categoryIndex = document.getElementById('desc-category-select').value;
        const position = document.getElementById('desc-position-select').value;
        const description = document.getElementById('desc-input').value;
        
        if (description.trim() === '') {
            alert('Please enter a valid description');
            return;
        }
        
        let success = false;
        if (position === 'before') {
            success = transportationServices.addDescriptionBefore(categoryIndex, description);
        } else {
            success = transportationServices.addDescriptionAfter(categoryIndex, description);
        }
        
        if (success) {
            document.getElementById('desc-input').value = '';
        } else {
            alert('Failed to add description');
        }
    });
}); 