/* [x]TODO :: Disable next button if user not choiced any option.
 * [x]TODO :: Check user answer with correct answer
 * [x]TODO :: Create scoring system and page.
 * [x]TODO :: Add mechanizim to show if the selected value was correct or not.
 * [x]TODO :: Question tracker how many questions left.
 * [x]TODO :: 
 */

import { questionObjects } from "./questions.js";

let print = console.log;

// Questin index to show in html page
let questionIndex = 0;
let correct = 0; // number of correct answers
let incorrect = 0; // number of incorrect answers
let correctPercent = 0; // Percentages of correct answers
let totalQuestions = 0;
let questions = [];

// -----------------------------------------------
//  Data Prep
// -----------------------------------------------
// Create 4 multi choice option out of the question object
function createOptions(options) {
    let optionsHtml = "";
    for (const option of options) {
        optionsHtml += `
    <div class="option">
        <label for="question">
           <input type="radio" name="option" value="${option}"><span dir="auto">${option}</span>
         </label>
     </div>
    `;
    }
    return optionsHtml;
}

// Create question out of a question object
// A question consist of a title and 4 option to choose from
function createQuestion(question) {
    return `
  <div class="question">
    <h3 class="question-title">${question.title}</h3>
    <pre class="question-code"><code>${question.code}</code></pre>
    <div class="options">${createOptions(question.options)}</div>
  </div>
  `;
}

// Create html version of all questions.
function createAllQuestions() {
    // An array contain all question which are representable
    // in html page.
    for (const questionObj of questionObjects) {
        // get a question
        let question = createQuestion(questionObj);
        questions.push(question);
    }
    // Store length of questions to use in showTestResult.
    totalQuestions = questions.length;
    return questions;
}

// Return current question object 
function getCurrentQuestion() {
    return questionObjects[questionIndex];
}

// Return answer value from current question object
function getCorrectAnswer() {
    return getCurrentQuestion().answer;
}

// -----------------------------------------------
//  Result update
// -----------------------------------------------
function checkAnswer(userAnswer) {
    if (userAnswer == getCorrectAnswer()) correct++;
    else incorrect ++;
    let questionsLeft = totalQuestions - questionIndex;
    document.getElementById("questionsLeft").innerHTML = questionsLeft;
    document.getElementById("correct").innerHTML = correct;
    document.getElementById("incorrect").innerHTML = incorrect;
    // document.getElementById("correctPre").innerHTML = (correct / totalQuestions) * 100;
}

// -----------------------------------------------
//  Load questions
// -----------------------------------------------

// If user choice an option load next question
function onOptionSelection() {
    const quizDiv = document.getElementById("quiz");
    const options = quizDiv.querySelectorAll(".option");

    // Load new question when user choice an option for current question.
    for (const option of options) {
        option.addEventListener("change", (event) => {

            // Check user selected value against correct answer
            checkAnswer(event.target.value);
            showNextQuestion(quizDiv);

        });
    }
}

// Display next question on the page
function showNextQuestion() {
    questionIndex++;
    showQuestion();
}

// Display current question on the page.
function showQuestion() {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = questions[questionIndex];
    onOptionSelection();
}

// starting point of the script.
function init() {
    questions = createAllQuestions();

    // Show first question
    showQuestion();

    // TODO: Fill informative part
}

document.addEventListener('DOMContentLoaded', init);

