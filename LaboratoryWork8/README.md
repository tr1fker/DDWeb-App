# Викторина с таймером

Веб-приложение для проведения викторины с ограничением времени на ответ. Приложение разработано в рамках лабораторной работы 8 по теме "Планирование вызова функций: setTimeout и setInterval, Работа с коллекциями JavaScript".

## Функциональность

- Настройка времени на ответ пользователем
- 10 вопросов с изображениями и 4 вариантами ответа
- Ограничение времени на каждый вопрос
- Отслеживание правильных и неправильных ответов
- Отображение результатов после завершения викторины
- Демонстрация правильных ответов с анимацией
- Возможность перезапуска викторины

## Технические особенности

- Использование методов `setTimeout` и `setInterval` для управления временем
- Хранение данных с использованием коллекций (`Map`)
- Адаптивный дизайн с использованием CSS3
- Анимации для улучшения пользовательского опыта

## Структура проекта

Проект организован в следующие папки:

- `html/` - содержит HTML-файлы
  - `index.html` - основная HTML-структура приложения
- `css/` - содержит файлы стилей
  - `styles.css` - стилевое оформление
- `js/` - содержит JavaScript-файлы
  - `script.js` - логика викторины и взаимодействие с пользователем
- `resources/` - содержит ресурсные файлы
  - `images/` - директория с изображениями для вопросов

## Инструкция по использованию

1. Откройте файл `html/index.html` в любом современном браузере
2. Установите желаемое время для ответа на каждый вопрос (от 5 до 60 секунд)
3. Нажмите кнопку "Начать викторину"
4. Выберите один из четырех вариантов ответа и нажмите "Ответить"
5. После завершения всех вопросов просмотрите свои результаты
6. Нажмите "Показать правильные ответы" для просмотра всех правильных ответов
7. Нажмите "Начать заново" для повторного прохождения викторины

## Требования для размещения изображений

Для корректной работы викторины необходимо добавить соответствующие изображения в папку `resources/images/` со следующими именами файлов:

- `world-map.jpg` - для вопроса о самой большой стране
- `eiffel-tower.jpg` - для вопроса об Эйфелевой башне
- `periodic-table.jpg` - для вопроса о химическом элементе
- `planets.jpg` - для вопроса о планете
- `great-wall.jpg` - для вопроса о Великой стене
- `programming.jpg` - для вопроса о языке программирования
- `animals.jpg` - для вопроса о самом быстром животном
- `oceans.jpg` - для вопроса о самом большом океане
- `fruits.jpg` - для вопроса о цитрусовом фрукте
- `mountains.jpg` - для вопроса о самой высокой горе 