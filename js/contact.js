// Form validation
const form = document.querySelector(".contact-form");

const yourName = document.querySelector("#name");
const nameErr = document.querySelector("#name-error");
const email = document.querySelector("#email");
const emailErr = document.querySelector("#email-error");
const subject = document.querySelector("#subject");
const subjectErr = document.querySelector("#subject-error");
const message = document.querySelector("#message");
const messageErr = document.querySelector("#message-error");

const sendBtn = document.querySelector("#send-button");

const overlay = document.getElementById("overlay");
const tyMessage = document.getElementById("ty-message");

function validateForm(event) {
  event.preventDefault();

  if (checkLength(yourName.value, 5) === true) {
    nameErr.style.display = "none";
    yourName.style.border = "solid 1px";
  } else {
    nameErr.style.display = "block";
    yourName.style.border = "#e7001e solid 1px";
  }

  if (validateEmail(email.value) === true) {
    emailErr.style.display = "none";
    email.style.border = "solid 1px";
  } else {
    emailErr.style.display = "block";
    email.style.border = "#e7001e solid 1px";
  }

  if (checkLength(subject.value, 14) === true) {
    subjectErr.style.display = "none";
    subject.style.border = "solid 1px";
  } else {
    subjectErr.style.display = "block";
    subject.style.border = "#e7001e solid 1px";
  }

  if (checkLength(message.value, 24) === true) {
    messageErr.style.display = "none";
    message.style.border = "solid 1px";
  } else {
    messageErr.style.display = "block";
    message.style.border = "#e7001e solid 1px";
  }

  if (
    checkLength(yourName.value, 0) === true &&
    validateEmail(email.value) === true &&
    checkLength(subject.value, 14) === true &&
    checkLength(message.value, 24) === true
  ) {
    console.log("it worked");
    tyMessage.classList.add("active");
    overlay.classList.add("active");
  } else {
    console.log("something is rotten in the state of denmark");
  }
}

form.addEventListener("submit", validateForm);
sendBtn.addEventListener("click", validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

// closing the thank you message and reloading page
const closeBtn = document.querySelector(".ty-close");

closeBtn.addEventListener("click", function () {
  location.reload();
  window.scrollTo(0, 0);
});
