let testLinks = document.querySelectorAll(".test");
let unit1score = localStorage.getItem("unit1score");
let unit2score = localStorage.getItem("unit2score");
let unit3score = localStorage.getItem("unit3score");
let unit4score = localStorage.getItem("unit4score");
let unit5score = localStorage.getItem("unit5score");
let unit6score = localStorage.getItem("unit6score");
let unit7score = localStorage.getItem("unit7score");
let unit8score = localStorage.getItem("unit8score");
let unit9score = localStorage.getItem("unit9score");
let finalScore = localStorage.getItem("finalScore");

let unit1displayscore = document.querySelector("#unit1score");
let unit2displayscore = document.querySelector("#unit2score");
let unit3displayscore = document.querySelector("#unit3score");
let unit4displayscore = document.querySelector("#unit4score");
let unit5displayscore = document.querySelector("#unit5score");
let unit6displayscore = document.querySelector("#unit6score");
let unit7displayscore = document.querySelector("#unit7score");
let unit8displayscore = document.querySelector("#unit8score");
let unit9displayscore = document.querySelector("#unit9score");
let finalDisplayScore = document.querySelector("#finalScore");

if (unit1score) {
  unit1displayscore.innerText = `${unit1score}%`;
}

if (unit2score) {
  unit2displayscore.innerText = `${unit2score}%`;
}

if (unit3score) {
  unit3displayscore.innerText = `${unit3score}%`;
}

if (unit4score) {
  unit4displayscore.innerText = `${unit4score}%`;
}

if (unit5score) {
  unit5displayscore.innerText = `${unit5score}%`;
}

if (unit6score) {
  unit6displayscore.innerText = `${unit6score}%`;
}

if (unit7score) {
  unit7displayscore.innerText = `${unit7score}%`;
}

if (unit8score) {
  unit8displayscore.innerText = `${unit8score}%`;
}

if (unit9score) {
  unit9displayscore.innerText = `${unit9score}%`;
}

if (finalScore) {
  finalDisplayScore.innerText = `${finalScore}%`;
}

testLinks.forEach((test) => {
  test.addEventListener("click", () => {
    localStorage.setItem("num", test.dataset["number"]);
  });
});
