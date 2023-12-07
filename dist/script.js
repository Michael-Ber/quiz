/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const DATA = [{
  question: 'Вопрос 1',
  answers: [{
    id: 1,
    value: 'Ответ 1',
    correct: true
  }, {
    id: 2,
    value: 'Ответ 2',
    correct: false
  }, {
    id: 3,
    value: 'Ответ 3',
    correct: false
  }]
}, {
  question: 'Вопрос 2',
  answers: [{
    id: 4,
    value: 'Ответ 4',
    correct: false
  }, {
    id: 5,
    value: 'Ответ 5',
    correct: true
  }]
}];
let results = {};
const quiz = document.getElementById('quiz');
const quizQuestions = document.getElementById('quiz-questions');
const quizAnswers = document.getElementById('quiz-answers');
const quizResults = document.getElementById('quiz-results');
const quizIndicators = document.getElementById('quiz-indicators');
const quizNext = document.getElementById('quiz-next');
const quizRestart = document.getElementById('quiz-restart');
quiz.addEventListener('click', e => {
  if (e.target.classList.contains('quiz__next')) {
    const nextQuestionIndex = Number(quizQuestions.dataset.currentStep) + 1;
    quizNext.disabled = true;
    if (DATA.length === nextQuestionIndex) {
      //переход к результатам
      renderResults();
      quizQuestions.classList.add('question-hidden');
      quizResults.classList.add('results-visible');
      quizIndicators.classList.add('indicators-hidden');
      quizNext.classList.add('btn-next-hidden');
      quizRestart.classList.add('btn-restart-visible');
    } else {
      //переход к следующему вопросу
      renderQuestionItem(nextQuestionIndex);
    }
  }
  if (e.target.classList.contains('quiz__restart')) {
    quizQuestions.classList.remove('question-hidden');
    quizResults.classList.remove('results-visible');
    quizIndicators.classList.remove('indicators-hidden');
    quizNext.classList.remove('btn-next-hidden');
    quizRestart.classList.remove('btn-restart-visible');
    renderQuestionItem(0);
    quizResults.innerHTML = '';
    results = {};
  }
});
quiz.addEventListener('change', e => {
  if (e.target.classList.contains('quiz-question-item__answer')) {
    results[e.target.name] = e.target.value;
    quizNext.disabled = false;
  }
});
const renderQuestionItem = index => {
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
                            </li>`;
  }).join('')}
            </ul>
        </div>
    `;
};
const renderIndicator = currentStep => {
  quizIndicators.innerHTML = `${currentStep}/${DATA.length}`;
};
const renderResults = () => {
  let content = '';
  const getClassName = (answer, index) => {
    let classname = '';
    if (!answer.correct && answer.id === Number(results[index])) {
      classname = 'quiz-result-item__answer quiz-result-item__answer_wrong';
    } else if (answer.correct) {
      classname = 'quiz-result-item__answer quiz-result-item__answer_correct';
    }
    return classname;
  };
  const getAnswers = questionIndex => {
    return DATA[questionIndex].answers.map(answer => `
                <li class="${getClassName(answer, questionIndex)}">
                    ${answer.value}
                </li>
            `).join('');
  };
  DATA.forEach((question, i) => {
    content += `
            <div class="quiz-result-item">
                <div class="quiz-result-item__question">${question.question}</div>
                <ul class="quiz-result-item__answers">
                    ${getAnswers(i)}
                </ul>
            </div>
        `;
  });
  quizResults.innerHTML = content;
};
renderQuestionItem(0);

/***/ })

/******/ });
//# sourceMappingURL=script.js.map