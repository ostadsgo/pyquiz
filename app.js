

var question = "<div class='question'>"
var q_index = 0;
for (const q of questions) {
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
}

qs = document.getElementById("questions");
qs.innerHTML = question;
