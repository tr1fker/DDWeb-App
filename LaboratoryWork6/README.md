# Freight Transportation Services Web Application

A web application for a freight transportation company that demonstrates the use of JavaScript classes, inheritance, and dynamic content loading.

## Project Structure

The project is organized into the following directories:
- `html/` - Contains HTML files (main page and any additional pages)
- `css/` - Contains CSS stylesheets for the web application
- `js/` - Contains JavaScript files with classes and functionality
- `resources/` - Contains images and other media files

## Features

1. Displays three categories of freight transportation services with ordered lists
2. Allows adding new services to any of the three categories
3. Allows adding new descriptions before or after existing paragraphs
4. Uses JavaScript classes with inheritance
5. Implements dynamic content loading using JavaScript DOM methods
6. Uses ES6 data structures (Map) for data storage

## JavaScript Classes

### Parent Class: TransportationServices
- Contains three constructors for different initialization scenarios
- Implements methods for rendering services, creating dropdowns, and text output
- Uses Map data structure to store service data

### Child Class: ExtendedTransportationServices
- Inherits from TransportationServices
- Adds functionality for inserting new services and descriptions
- Implements DOM manipulation methods

## How to Use

1. Open the `html/index.html` file in a web browser
2. View the three categories of freight transportation services
3. Use the form on the right to add new services or descriptions

## Technical Requirements

- Uses CSS3 for styling
- Uses Map data structure from ES6
- Implements class inheritance
- Dynamically renders content on the page 