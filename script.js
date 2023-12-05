const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startGame);

const questionContainerElement = document.querySelector(".kort");

let currentQuestionIndex;

function startGame() {
  console.log("Started");
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");

  setNextQuestion();
}

function setNextQuestion() {}

function selectAnswer() {}

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
