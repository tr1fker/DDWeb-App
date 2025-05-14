// Quiz data - store questions, options, and correct answers
const quizData = new Map([
    [1, {
        image: 'images/world-map.jpg',
        question: 'Какая страна является самой большой по площади?',
        options: ['Канада', 'Китай', 'Россия', 'США'],
        correctAnswer: 2
    }],
    [2, {
        image: 'images/eiffel-tower.jpg',
        question: 'В каком городе находится Эйфелева башня?',
        options: ['Лондон', 'Париж', 'Рим', 'Берлин'],
        correctAnswer: 1
    }],
    [3, {
        image: 'images/periodic-table.jpg',
        question: 'Какой химический элемент обозначается символом "O"?',
        options: ['Олово', 'Осмий', 'Кислород', 'Золото'],
        correctAnswer: 2
    }],
    [4, {
        image: 'images/planets.jpg',
        question: 'Какая планета находится ближе всего к Солнцу?',
        options: ['Венера', 'Земля', 'Марс', 'Меркурий'],
        correctAnswer: 3
    }],
    [5, {
        image: 'images/great-wall.jpg',
        question: 'В какой стране находится Великая стена?',
        options: ['Япония', 'Китай', 'Монголия', 'Корея'],
        correctAnswer: 1
    }]
    [6, {
        image: 'images/programming.jpg',
        question: 'Какой язык программирования был создан первым?',
        options: ['Фортран', 'Паскаль', 'Си', 'Бейсик'],
        correctAnswer: 0
    }],
    [7, {
        image: 'images/animals.jpg',
        question: 'Какое животное самое быстрое на земле?',
        options: ['Лев', 'Гепард', 'Антилопа', 'Ястреб'],
        correctAnswer: 1
    }],
    [8, {
        image: 'images/oceans.jpg',
        question: 'Какой океан самый большой?',
        options: ['Атлантический', 'Индийский', 'Северный Ледовитый', 'Тихий'],
        correctAnswer: 3
    }],
    [9, {
        image: 'images/fruits.jpg',
        question: 'Какой из этих фруктов цитрусовый?',
        options: ['Яблоко', 'Банан', 'Апельсин', 'Груша'],
        correctAnswer: 2
    }],
    [10, {
        image: 'images/mountains.jpg',
        question: 'Какая гора является самой высокой в мире?',
        options: ['Килиманджаро', 'Эльбрус', 'Эверест', 'Монблан'],
        correctAnswer: 2
    }]
]);

// Constants
const ANSWERS_DISPLAY_INTERVAL = 3000; // Time to display each answer in ms (3 seconds)

// DOM Elements
const setupSection = document.getElementById('setup-section');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const answersSection = document.getElementById('answers-section');
const timeInput = document.getElementById('time-input');
const startQuizButton = document.getElementById('start-quiz');
const timerValue = document.getElementById('timer-value');
const currentQuestion = document.getElementById('current-question');
const totalQuestions = document.getElementById('total-questions');
const questionImage = document.getElementById('question-image');
const questionText = document.getElementById('question-text');
const optionTexts = [
    document.getElementById('option1-text'),
    document.getElementById('option2-text'),
    document.getElementById('option3-text'),
    document.getElementById('option4-text')
];
const radioButtons = document.getElementsByName('answer');
const submitAnswerButton = document.getElementById('submit-answer');
const correctCount = document.getElementById('correct-count');
const totalCount = document.getElementById('total-count');
const resultDetails = document.getElementById('result-details');
const showAnswersButton = document.getElementById('show-answers');
const answersContainer = document.getElementById('answers-container');
const restartQuizButton = document.getElementById('restart-quiz');

// Quiz state variables
let timePerQuestion = 20; // Default time per question in seconds
let currentQuestionIndex = 1;
let timer;
let userAnswers = new Map(); // Map to store user's answers
let timerInterval;

// Event Listeners
startQuizButton.addEventListener('click', startQuiz);
submitAnswerButton.addEventListener('click', submitAnswer);
showAnswersButton.addEventListener('click', showCorrectAnswers);
restartQuizButton.addEventListener('click', restartQuiz);

// Enable radio buttons
radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        submitAnswerButton.disabled = false;
    });
});

// Initialize the quiz
function initializeQuiz() {
    // Set the total questions count
    totalQuestions.textContent = quizData.size;
    totalCount.textContent = quizData.size;
    
    // Reset user answers
    userAnswers = new Map();
}

// Start the quiz
function startQuiz() {
    // Get the time per question from the input
    timePerQuestion = parseInt(timeInput.value);
    if (isNaN(timePerQuestion) || timePerQuestion < 5) {
        timePerQuestion = 20; // Default to 20 seconds if invalid
    }
    
    // Hide setup section and show quiz section
    setupSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    
    // Initialize quiz
    initializeQuiz();
    
    // Load the first question
    loadQuestion(currentQuestionIndex);
}

// Load a question
function loadQuestion(questionIndex) {
    // Update the current question display
    currentQuestion.textContent = questionIndex;
    
    // Get the question data
    const questionData = quizData.get(questionIndex);
    
    // Set the question image
    questionImage.src = questionData.image;
    
    // Set the question text
    questionText.textContent = questionData.question;
    
    // Set the options
    questionData.options.forEach((option, index) => {
        optionTexts[index].textContent = option;
    });
    
    // Reset the radio buttons
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    // Disable the submit button until a choice is made
    submitAnswerButton.disabled = true;
    
    // Start the timer
    timer = timePerQuestion;
    timerValue.textContent = timer;
    
    // Clear any existing interval
    clearInterval(timerInterval);
    
    // Set up a new timer interval
    timerInterval = setInterval(() => {
        timer--;
        timerValue.textContent = timer;
        
        if (timer <= 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}

// Time's up function
function timeUp() {
    // Save the lack of answer (default to -1 for "no answer")
    userAnswers.set(currentQuestionIndex, -1);
    
    // Go to the next question or finish the quiz
    moveToNextQuestion();
}

// Submit answer function
function submitAnswer() {
    // Clear the timer
    clearInterval(timerInterval);
    
    // Get the selected answer
    let selectedAnswer = -1;
    radioButtons.forEach((radio, index) => {
        if (radio.checked) {
            selectedAnswer = parseInt(radio.value);
        }
    });
    
    // Save the answer
    userAnswers.set(currentQuestionIndex, selectedAnswer);
    
    // Go to the next question or finish the quiz
    moveToNextQuestion();
}

// Move to the next question or finish the quiz
function moveToNextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex <= quizData.size) {
        // Load the next question
        loadQuestion(currentQuestionIndex);
    } else {
        // Quiz is complete, show results
        finishQuiz();
    }
}

// Finish the quiz and show results
function finishQuiz() {
    // Hide the quiz section and show the results section
    quizSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
    // Calculate the number of correct answers
    let correctAnswers = 0;
    
    // Generate the result details HTML
    let resultHTML = '';
    
    userAnswers.forEach((answer, questionIndex) => {
        const questionData = quizData.get(questionIndex);
        const isCorrect = answer === questionData.correctAnswer;
        
        if (isCorrect) {
            correctAnswers++;
        }
        
        const status = isCorrect ? 'correct' : 'incorrect';
        const userAnswer = answer === -1 ? 'Нет ответа' : questionData.options[answer];
        const correctAnswerText = questionData.options[questionData.correctAnswer];
        
        resultHTML += `
            <div class="result-item">
                <img src="${questionData.image}" alt="Вопрос ${questionIndex}" class="result-image">
                <div class="result-text">
                    <p>${questionData.question}</p>
                    <p>Ваш ответ: <span class="${status}">${userAnswer}</span></p>
                    <p>Правильный ответ: <span class="correct">${correctAnswerText}</span></p>
                </div>
            </div>
        `;
    });
    
    // Update the correct count
    correctCount.textContent = correctAnswers;
    
    // Update the result details
    resultDetails.innerHTML = resultHTML;
}

// Show correct answers with animation
function showCorrectAnswers() {
    // Hide results section and show answers section
    resultSection.classList.add('hidden');
    answersSection.classList.remove('hidden');
    
    // Clear the answers container
    answersContainer.innerHTML = '';
    
    // Counter for displaying answers sequentially
    let index = 1;
    
    // Function to display a single answer
    const displayAnswer = (questionIndex) => {
        const questionData = quizData.get(questionIndex);
        const answerHTML = `
            <div class="answer-item">
                <img src="${questionData.image}" alt="Вопрос ${questionIndex}" class="answer-image">
                <div class="answer-text">
                    <h4>${questionData.question}</h4>
                    <p>${questionData.options[questionData.correctAnswer]}</p>
                </div>
            </div>
        `;
        
        answersContainer.innerHTML += answerHTML;
        
        // Move to the next answer or stop
        index++;
        if (index <= quizData.size) {
            setTimeout(() => displayAnswer(index), ANSWERS_DISPLAY_INTERVAL);
        }
    };
    
    // Start displaying answers
    displayAnswer(index);
}

// Restart the quiz
function restartQuiz() {
    // Reset variables
    currentQuestionIndex = 1;
    
    // Hide answers section and show setup section
    answersSection.classList.add('hidden');
    setupSection.classList.remove('hidden');
}

// Initialize the page
initializeQuiz(); 