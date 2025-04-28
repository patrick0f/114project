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
let questionCounter = 1;
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

const maxQuestions = 10;

let getNewQuestion = () => {
  
  progressText.innerText = `Question: ${questionCounter}/${maxQuestions}`;

  progressbarfull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

  questionCounter++;

  currentQuestion = availableQuestions[0];
  question.innerText = currentQuestion.question;
  choices.forEach((choice) => {
    choice.parentElement.classList.remove("select");
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    choice.disabled = false;
  });

  availableQuestions.splice(0, 1);
  acceptingQuestion = true;
  nextbtn.disabled = true;
  choices.forEach((choice) => {
    choice.parentElement.classList.remove("disabled");
  });
};

let startGame = () => {
  questionCounter = 1;
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
  let selectedAnswer = selectedChoice.dataset.number;
  userAnswers.push(currentQuestion["choice" + selectedAnswer]);
  selectedChoice.parentElement.classList.add("select");
  choices.forEach((choice) => {
    choice.parentElement.classList.add("disabled");
    choice.disabled = true;
  });
};

async function callChatGPT(prompt) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500
    })
  });
  const json = await res.json();
  const resp = json.choices[0].message.content;
  console.log(resp);
localStorage.setItem("response", resp);
}

nextbtn.addEventListener("click", async () => {
  // are we done with all questions?
  if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
    // 1) build the prompt
    const prompt = `ChatGPT, I’m running a dietary‐habits quiz with 10 multiple‐choice questions. I will give you the user’s selected answers, ignore any potentially strange comments—please:  
1. Assess the overall healthiness of their diet. 
2. Identify any likely nutrient deficiencies or excesses. 
3. Recommend traditional Asian food alternatives or inclusions to help address each issue.
Here are the questions and the user’s answers: 

1. How many servings of fruits and vegetables do you eat on a typical day? Answer: ${userAnswers[0]}
2. What type of grains make up most of your meals? Answer: ${userAnswers[1]}
3. How often do you eat red meat (beef, pork, lamb) per week? Answer: ${userAnswers[2]}
4. How often do you eat fish or seafood each week? Answer: ${userAnswers[3]} 
5. How often do you include plant‐based proteins (tofu, legumes, nuts) in your meals? Answer: ${userAnswers[4]}
6. How often do you consume fermented foods (yogurt, kimchi, sauerkraut, miso)? Answer: ${userAnswers[5]}
7. How often do you have sugary drinks or sweet snacks? Answer: ${userAnswers[6]}
8. On average, how many cups of water do you drink per day? Answer: ${userAnswers[7]} 
9. How often do you eat fried or fast foods per week? Answer: ${userAnswers[8]} 
10. Which best describes your meal variety? Answer: ${userAnswers[9]}

Please format your response exactly like this, with a max response length of 135 words:
<p>Your overall diet assessment is: {number / 10, being generally nicer and more lenient with the rating unless the diet is extra terrible} </p>
<p>Your diet is { describe deficiencies / excesses; if their diet is great then describe how it is healthy } </p>
<p>To supplement your {related deficiency}, consider {two potential asian food alternatives}! {explain how each suggestion is beneficial and its effects on the body/healthy components in a positve and enthusiastic tone} </p>
`

callChatGPT(prompt);

// 4) finally, go to results.html
window.location.assign("results.html");

} else {
getNewQuestion();
}
});
