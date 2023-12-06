const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

const questionContainerElement = document.querySelector(".kort");
const answerButtonsElement = document.getElementById("answer-buttons");
let currentQuestionIndex;

// Start game function ----------------------------------

function startGame() {
  console.log("Started");
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function showQuestion(question) {
  const questionElement = document.getElementById("question");
  questionElement.innerText = question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtonsElement.append(button);
  });
}

function selectAnswer(answer) {
  const correct = answer.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.innerText == answer.text);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Börja om";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// Frågor array -----------------------------------------

const questions = [
  {
    question: "Vilket år grundades Ankademin?",
    answers: [
      { text: "År 1929", correct: false },
      { text: "År 1994", correct: true },
      { text: "År 1849", correct: false },
      { text: "År 1999", correct: false },
    ],
  },
  {
    question: "Vilka personer jobbar INTE på Ankademin",
    answers: [
      { text: "Brandon Duarte Tsegai", correct: false },
      { text: "Brandon Ingram", correct: true },
      { text: "Brandon Knight", correct: true },
      { text: "Marlon Brando", correct: true },
    ],
  },
  {
    question: "Wilhelm studerar på Ankademin, vad studerar Wilhelm till?",
    answers: [
      { text: "Massör", correct: false },
      { text: "Hudvårdsspecialist", correct: false },
      { text: "Makeupartist", correct: false },
      { text: "Frontend utvecklare", correct: true },
    ],
  },
];
