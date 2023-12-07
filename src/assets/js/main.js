
const DATA = [
    {
        question: 'Вопрос 1',
        answers: [
            {
                id: 1,
                value: 'Ответ 1',
                correct: true
            },
            {
                id: 2,
                value: 'Ответ 2',
                correct: false
            },
            {
                id: 3,
                value: 'Ответ 3',
                correct: false
            },
        ]
    },
    {
        question: 'Вопрос 2',
        answers: [
            {
                id: 4,
                value: 'Ответ 4',
                correct: false
            },
            {
                id: 5,
                value: 'Ответ 5',
                correct: true
            }
        ]
    },
];

let results = {};


const quiz = document.getElementById('quiz');
const quizQuestions = document.getElementById('quiz-questions');
const quizAnswers = document.getElementById('quiz-answers');
const quizResults = document.getElementById('quiz-results');
const quizIndicators = document.getElementById('quiz-indicators');
const quizNext = document.getElementById('quiz-next');
const quizRestart = document.getElementById('quiz-restart');

quiz.addEventListener('click', (e) => {
    if (e.target.classList.contains('quiz__next')) {
        const nextQuestionIndex = Number(quizQuestions.dataset.currentStep) + 1;
        quizNext.disabled = true;
        if (DATA.length === nextQuestionIndex) {
            //переход к результатам
            renderResults();
            quizQuestions.classList.add('question-hidden')
            quizResults.classList.add('results-visible')
            quizIndicators.classList.add('indicators-hidden')
            quizNext.classList.add('btn-next-hidden')
            quizRestart.classList.add('btn-restart-visible')
        } else {
            //переход к следующему вопросу
            renderQuestionItem(nextQuestionIndex);

        }
    }
    if (e.target.classList.contains('quiz__restart')) {
        quizQuestions.classList.remove('question-hidden')
        quizResults.classList.remove('results-visible')
        quizIndicators.classList.remove('indicators-hidden')
        quizNext.classList.remove('btn-next-hidden')
        quizRestart.classList.remove('btn-restart-visible')
        renderQuestionItem(0);
        quizResults.innerHTML = '';
        results = {};
    }

})

quiz.addEventListener('change', (e) => {
    if (e.target.classList.contains('quiz-question-item__answer')) {
        results[e.target.name] = e.target.value
        quizNext.disabled = false

    }
})

const renderQuestionItem = (index) => {
    renderIndicator(index + 1);

    quizQuestions.dataset.currentStep = index;
    quizQuestions.innerHTML = `
        <div class="quiz-question-item">
            <div class="quiz-question-item__question" id="quiz-questions">
                ${DATA[index].question}
            </div>
            <ul class="quiz-question-item__answers" id="quiz-answers">
                ${DATA[index].answers.map(item => {
        return `<li>
                                <label>
                                    <input type="radio" name="${index}" class="quiz-question-item__answer" value=${item.id}>
                                    ${item.value}
                                </label>
                            </li>`
    }).join('')}
            </ul>
        </div>
    `;
}

const renderIndicator = (currentStep) => {
    quizIndicators.innerHTML = `${currentStep}/${DATA.length}`
}

const renderResults = () => {
    let content = '';

    const getClassName = (answer, index) => {
        let classname = '';
        if (!answer.correct && answer.id === Number(results[index])) {
            classname = 'quiz-result-item__answer quiz-result-item__answer_wrong'
        } else if (answer.correct) {
            classname = 'quiz-result-item__answer quiz-result-item__answer_correct'
        }
        return classname
    }

    const getAnswers = (questionIndex) => {
        return DATA[questionIndex].answers
            .map(answer => `
                <li class="${getClassName(answer, questionIndex)}">
                    ${answer.value}
                </li>
            `)
            .join('')
    }

    DATA.forEach((question, i) => {
        content += `
            <div class="quiz-result-item">
                <div class="quiz-result-item__question">${question.question}</div>
                <ul class="quiz-result-item__answers">
                    ${getAnswers(i)}
                </ul>
            </div>
        `;
    })
    quizResults.innerHTML = content;
}

renderQuestionItem(0);

