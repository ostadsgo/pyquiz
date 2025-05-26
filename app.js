/* TODO :: Disable next button if user not choiced any option.
 * TODO :: Check user answer with correct answer
 * TODO :: Create scoring system and page.
 * TODO :: Add mechanizim to show if the selected value was correct or not.
 */


// Questin index to show in html page
let questionIndex = 0;
let score = 0;

// Create 4 multi choice option out a question object
function createOptions(options) {
  let optionsHtml = "";
  for (const option of options) {
    optionsHtml += `
    <label>
       <input type="radio" class="option" name="option" value="${option}">${option}
     </label><br>
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
  let questions = [];
  for (const questionObj of questionObjects) {
    // get a question
    let question = createQuestion(questionObj);
    questions.push(question);
  }
  return questions;
}

// show a question on html page
function showNextQuestion(questionsDiv, questions) {
  questionsDiv.innerHTML = questions[questionIndex++];
}

// Get value of selected radio button.
function getSelectedValue(options) {
  for (const option of options) {
    if (option.checked)
      return option.value;
  }
}

function getCorrectAnswer() {
  // When script run it showes first question and questionIndex will
  // inc by one so current question must decerase by one.
  const currentQuestion = questionObjects[questionIndex - 1];
  return currentQuestion.answer;
}

function calculateScore(selectedValue, correctAnswer) {
  if (selectedValue == correctAnswer)
    score += 1
}

// event handler when user clicked on nextButton in the html page
function onNextButton(questionsDiv, questions) {
  const options = questionsDiv.querySelectorAll(".option");
  const selectedValue = getSelectedValue(options);
  const correctAnswer = getCorrectAnswer();
  calculateScore(selectedValue, correctAnswer);
  // if there is question show next question
  if (questionIndex < questionObjects.length){
    showNextQuestion(questionsDiv, questions);
    console.log(score);
  }
  // show test result
  else {
  }

}

// starting point of the script.
function main() {
  const questions = createAllQuestions();
  const questionsDiv = document.getElementById("questions");
  const nextButton = document.getElementById("next-button");
  showNextQuestion(questionsDiv, questions);
  nextButton.addEventListener("click", () =>
    onNextButton(questionsDiv, questions),
  );
}

main();
