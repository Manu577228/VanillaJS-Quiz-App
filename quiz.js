const questions = [
    {
        question: "Which of the following scoping type does JavaScript use?",
        answers: [
            { text: "Sequential", correct: false },
            { text: "Segmental", correct: false },
            { text: "Lexical", correct: true },
            { text: "Literal", correct: false },
        ]
    },

    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        answers: [
            { text: "It is an ordered list of values", correct: true },
            { text: " It is an ordered list of objects", correct: false },
            { text: "It is an ordered list of string", correct: false },
            { text: "It is an ordered list of functions", correct: false },
        ]
    },

    {
        question: "Which of the following is not a Javascript framework?",
        answers: [
            { text: "Svelte", correct: false },
            { text: "React", correct: true },
            { text: "Angular", correct: false },
            { text: "Vue", correct: false },
        ]
    },

    {
        question: "Which of the following is not an error in JavaScript?",
        answers: [
            { text: "Missing of Bracket", correct: false },
            { text: "Syntax error", correct: false },
            { text: "Reference Error", correct: false },
            { text: "Division by zero", correct: true },
        ]
    },

    {
        question: "Which one of the following is the correct way for calling the JavaScript code?",
        answers: [
            { text: "Preprocessor", correct: false },
            { text: "Triggering Event", correct: false },
            { text: "RMI", correct: false },
            { text: "Function/Method", correct: true },
        ]
    },

    {
        question: "Which of the following type of a variable is volatile?",
        answers: [
            { text: "Mutable variable", correct: true },
            { text: "Dynamic variable ", correct: false },
            { text: "Volatile variable", correct: false },
            { text: "Immutable variable", correct: false },
        ]
    },

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();

