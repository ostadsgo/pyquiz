/* [x]TODO :: Disable next button if user not choiced any option.
 * [x]TODO :: Check user answer with correct answer
 * [x]TODO :: Create scoring system and page.
 * [x]TODO :: Add mechanizim to show if the selected value was correct or not.
 */

// Questin index to show in html page
let questionIndex = 0;
let correct = 0; // number of correct answers
let incorrect = 0; // number of incorrect answers
let correctPercent = 0; // Percentages of correct answers
let numberOfQuestions = 0;

// Create 4 multi choice option out of the question object
function createOptions(options) {
  let optionsHtml = "";
  for (const option of options) {
    optionsHtml += `
    <label>
       <input type="radio" class="option" name="option" value="${option}"><span dir="auto">${option}</span>
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
  // Store length of questions to use in showTestResult.
  numberOfQuestions = questions.length;
  return questions;
}

// show a question on html page
function showNextQuestion(questionsDiv, questions) {
  questionsDiv.innerHTML = questions[questionIndex++];
}

// Get value of selected radio button.
function getSelectedValue(options) {
  for (const option of options) {
    if (option.checked) return option.value;
  }
}

function getCorrectAnswer() {
  // When script run it showes first question and questionIndex will
  // inc by one so current question must decerase by one.
  const currentQuestion = questionObjects[questionIndex - 1];
  return currentQuestion.answer;
}

// Number of incorrect answers
// Number of correct answers
function calculateScore(selectedValue, correctAnswer) {
  if (selectedValue == correctAnswer) {
    correct++;
  } else {
    incorrect++;
  }
}

function showTestResult() {
  // Success Precentages
  correctPercent = (correct / numberOfQuestions) * 100;
  console.log(`
    Number of correct answers: ${correct}\n
    Number of Incorrect answers: ${incorrect}\n
    Correct percentages: ${correctPercent}
  `);
  const nextButton = document.getElementById("next-button");
  nextButton.disabled = true;
}

// event handler when user clicked on nextButton in the html page
function onNextButton(questionsDiv, questions) {
  const nextButton = document.getElementById("next-button");
  nextButton.disabled = true;
  const options = questionsDiv.querySelectorAll(".option");
  const selectedValue = getSelectedValue(options);
  const correctAnswer = getCorrectAnswer();

  // Determine user score based on the answer
  calculateScore(selectedValue, correctAnswer);

  // if there is question show next question
  if (questionIndex < questionObjects.length) {
    showNextQuestion(questionsDiv, questions);
  }
  // show test result
  else {
    showTestResult();
  }
}

// starting point of the script.
function main() {
  const questions = createAllQuestions();
  const questionsDiv = document.getElementById("questions");
  const nextButton = document.getElementById("next-button");

  // Show first question
  showNextQuestion(questionsDiv, questions);

  // Disable next button
  nextButton.disabled = true;

  // Enable if an option choiced. Should be after showNextQuestion.
  // There must be a question with options to add event to the options.
  const options = questionsDiv.querySelectorAll(".option");

  // If any option choiced then enable nextButton
  for (const option of options) {
    option.addEventListener("change", () => {
      console.log("changed");
      nextButton.disabled = false;
    });
  }

  // on nextButton pressed
  nextButton.addEventListener("click", () =>
    onNextButton(questionsDiv, questions),
  );
}

main();
