const percentScore = document.querySelector("#testscore");
const evaluation = document.querySelector("#evaluation");
let testNum = localStorage.getItem("num");
let testscore = localStorage.getItem(`unit${testNum}score`);

percentScore.innerText = `${testscore}%`;

function greetingText() {
  if (testscore <= 50) {
    evaluation.innerText = "You can do better than that! Try again next time!";
  } else if (testscore <= 99) {
    evaluation.innerText = "Great job! You know your stuff!";
  } else if (testscore == 100) {
    evaluation.innerText = "Wow, that was perfect! You're on the way to a 5!";
  }
}




greetingText();
