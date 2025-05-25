let all_questions = [];
var q_index = 0;
for (const q of questions) {
  let question = "<div class='question'>"
  question += `<h3>${q.title}</h3>`
  if (q.code) {
    question += `<code><pre>${q.code}</pre></code>`
  }
  let opts = "<div class='options'>";
  for (const o of q.options) {
    opts += `<label><input type="radio" name="q${q_index}" value="${o}">${o}</label><br>`
  }
  opts += "</div>";
  question += opts;
  q_index ++;
  question += "</div>"
  all_questions.push(question);
}

let index = 0;
qs = document.getElementById("questions");
qs.innerHTML = all_questions[index++];

nextBtn = document.getElementById("next_btn");
nextBtn.addEventListener("click", () => { 
  qs = document.getElementById("questions");
  qs.innerHTML = all_questions[index++];
  if (index > all_questions.length) {
    nextBtn.disabled = true;
  }
});


