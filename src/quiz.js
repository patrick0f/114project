const question = document.querySelector("#question");
const nextbtn = document.querySelector(".btn");
const choices = Array.from(document.getElementsByClassName("text"));
const texts = document.querySelectorAll(".text");
const progressText = document.getElementById("progressText");
const progressbarfull = document.getElementById("progressbarfull");
const loader = document.getElementById("loadingdiv");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingQuestion = false;
let questionCounter = 0;
let availableQuestions = [];
let userAnswers = [];

let questions = [];

let fileName = `questions.json`;

fetch(fileName)
  .then((res) => {
    return res.json();
  })
  .then((returned) => {
    questions = returned;
    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

const maxQuestions = 5;

let getNewQuestion = () => {
  
  progressText.innerText = `Question: ${questionCounter}/${maxQuestions}`;

  progressbarfull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

  const questionIndex = questionCounter;

  questionCounter++;

  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    choice.disabled = false;
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingQuestion = true;
  nextbtn.disabled = true;
  choices.forEach((choice) => {
    choice.parentElement.classList.remove("disabled");
  });
};

let startGame = () => {
  questionCounter = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    answerChoice(e);
    nextbtn.disabled = false;
  });
});

let answerChoice = (click) => {
  let selectedChoice = click.target;
  console.log(currentQuestion);
  console.log(selectedChoice);
  // let correctChoice = document.querySelector(`#one${currentQuestion.answer}`);
  // let selectedAnswer = selectedChoice.dataset.number;
  choices.forEach((choice) => {
    choice.parentElement.classList.add("disabled");
    choice.disabled = true;
  });
};

nextbtn.addEventListener("click", () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem(`unit${testNum}score`, score);

    
const API_KEY = "sk-REPLACE_WITH_YOUR_KEY";

document.getElementById("send").onclick = async () => {
  const prompt = document.getElementById("prompt").value;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150
    })
  });
  const json = await res.json();
  document.getElementById("response").textContent =
    json.choices?.[0]?.message?.content || JSON.stringify(json, null, 2);
};



    return window.location.assign(`results.html`);
  } else {
    getNewQuestion();
  }
});
