const evaluation = document.querySelector("#evaluation");
let response = localStorage.getItem("response");

if (response) {
  evaluation.innerHTML = response;
}

nextBtn = document.querySelector(".btn");

nextBtn.addEventListener("click", () => {

return window.location.assign(`index.html`);

});
