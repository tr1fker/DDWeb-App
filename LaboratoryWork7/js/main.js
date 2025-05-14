// ECMA 6 implementation for block customization
'use strict';

// Используем структуру Map для хранения стилей блоков
const blockStylesMap = new Map();

// Используем Set для хранения доступных опций
const availableBlocks = new Set(['block1', 'block2', 'block3']);
const availableWidths = new Set(['200px', '300px', '400px', '500px', '600px']);
const availableHeights = new Set(['150px', '200px', '250px', '300px', '350px']);
const availableBorders = new Set(['solid', 'dashed', 'dotted', 'double', 'groove']);
const availableBorderColors = new Set(['#ff5733', '#33ff57', '#3357ff', '#f3ff33', '#33fff3']);
const availableBorderWidths = new Set(['1px', '2px', '3px', '4px', '5px']);

// Используем структуру Map для хранения изображений фона
const backgroundImages = new Map([
    ['bg1.jpg', '../resource/bg1.jpg'],
    ['bg2.jpg', '../resource/bg2.jpg'],
    ['bg3.jpg', '../resource/bg3.jpg'],
    ['bg4.jpg', '../resource/bg4.jpg'],
    ['bg5.jpg', '../resource/bg5.jpg']
]);

// Используем структуру Map для заголовков и текстов
const contentMap = new Map();

// Инициализация начальных стилей блоков
const initializeStyles = () => {
    // Используем стрелочные функции ECMA 6
    availableBlocks.forEach(blockId => {
        blockStylesMap.set(blockId, {
            width: '300px',
            height: '200px',
            backgroundImage: 'none',
            borderStyle: 'solid',
            borderColor: '#3498db',
            borderWidth: '2px'
        });
        
        // Инициализация контента
        const titleElement = document.querySelector(`#${blockId} h3`);
        const textElement = document.querySelector(`#${blockId} p`);
        
        contentMap.set(blockId, {
            title: titleElement.textContent,
            text: textElement.textContent
        });
    });
};

// Функция для применения стилей к блокам
const applyStyles = (blockId) => {
    if (!availableBlocks.has(blockId)) return;
    
    const styles = blockStylesMap.get(blockId);
    const blockElement = document.getElementById(blockId);
    
    if (!blockElement) return;
    
    // Применяем стили к блоку
    Object.entries(styles).forEach(([property, value]) => {
        if (property === 'backgroundImage' && value !== 'none') {
            blockElement.style[property] = `url(${backgroundImages.get(value)})`;
        } else {
            blockElement.style[property] = value;
        }
    });
    
    // Применяем содержимое
    const content = contentMap.get(blockId);
    const titleElement = blockElement.querySelector('h3');
    const textElement = blockElement.querySelector('p');
    
    if (titleElement && content.title) {
        titleElement.textContent = content.title;
    }
    
    if (textElement && content.text) {
        textElement.textContent = content.text;
    }
};

// Используем замыкание для создания функции обновления стилей блока
const createStyleUpdater = (blockId) => {
    // Замыкание - сохраняем blockId
    return (property, value) => {
        if (!blockStylesMap.has(blockId)) return;
        
        const blockStyles = blockStylesMap.get(blockId);
        blockStyles[property] = value;
        blockStylesMap.set(blockId, blockStyles);
        
        // Применяем обновленные стили
        applyStyles(blockId);
    };
};

// Используем замыкание для создания функции обновления содержимого блока
const createContentUpdater = (blockId) => {
    // Замыкание - сохраняем blockId
    return function(contentType, newContent) {
        if (!contentMap.has(blockId)) return;
        
        const content = contentMap.get(blockId);
        content[contentType] = newContent;
        contentMap.set(blockId, content);
        
        // Используем метод bind() для привязки контекста
        applyStyles.bind(null, blockId)();
    };
};

// Обработчик события изменения блока
const handleBlockChange = () => {
    const blockSelect = document.getElementById('block-select');
    const selectedBlock = blockSelect.value;
    
    // Обновляем селекторы в соответствии с текущими стилями выбранного блока
    if (blockStylesMap.has(selectedBlock)) {
        const styles = blockStylesMap.get(selectedBlock);
        const content = contentMap.get(selectedBlock);
        
        document.getElementById('width-select').value = styles.width;
        document.getElementById('height-select').value = styles.height;
        document.getElementById('border-style-select').value = styles.borderStyle;
        document.getElementById('border-color-select').value = styles.borderColor;
        document.getElementById('border-width-select').value = styles.borderWidth;
        
        // Фоновое изображение может быть в формате url()
        const bgImage = styles.backgroundImage;
        if (bgImage !== 'none') {
            // Находим ключ в Map для текущего фона
            for (const [key, value] of backgroundImages.entries()) {
                if (bgImage.includes(key)) {
                    document.getElementById('bg-select').value = key;
                    break;
                }
            }
        }
        
        document.getElementById('title-select').value = content.title;
        document.getElementById('text-select').value = content.text;
    }
};

// Применение изменений из контролов
const applyChanges = () => {
    const selectedBlock = document.getElementById('block-select').value;
    
    if (!availableBlocks.has(selectedBlock)) return;
    
    // Получаем выбранные значения
    const width = document.getElementById('width-select').value;
    const height = document.getElementById('height-select').value;
    const bgImage = document.getElementById('bg-select').value;
    const borderStyle = document.getElementById('border-style-select').value;
    const borderColor = document.getElementById('border-color-select').value;
    const borderWidth = document.getElementById('border-width-select').value;
    const title = document.getElementById('title-select').value;
    const text = document.getElementById('text-select').value;
    
    // Используем созданные ранее функции с замыканием
    const styleUpdater = createStyleUpdater(selectedBlock);
    const contentUpdater = createContentUpdater(selectedBlock);
    
    // Обновляем стили
    styleUpdater('width', width);
    styleUpdater('height', height);
    styleUpdater('backgroundImage', bgImage);
    styleUpdater('borderStyle', borderStyle);
    styleUpdater('borderColor', borderColor);
    styleUpdater('borderWidth', borderWidth);
    
    // Обновляем содержимое
    // Используем метод call() для вызова функции с другим контекстом
    contentUpdater.call(null, 'title', title);
    // Используем метод apply() для вызова функции с другим контекстом
    contentUpdater.apply(null, ['text', text]);
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация стилей
    initializeStyles();
    
    // Применяем начальные стили ко всем блокам
    availableBlocks.forEach(blockId => {
        applyStyles(blockId);
    });
    
    // Установка обработчиков событий
    document.getElementById('block-select').addEventListener('change', handleBlockChange);
    document.getElementById('apply-button').addEventListener('click', applyChanges);
    
    // Начальная настройка элементов управления
    handleBlockChange();
}); 