/* 
- Skapa en quizzapp med 10 frågor
- Sant/falskt frågor, multiple choise frågor (fyra svarsalternativ varav ett rätt), checkbox-svar (4 svarsalternativ varav flera är rätt)
- Någonting som håller koll på poängen. En räknare 
- Mellan vajre fråga så måste fältet med frågor tömmas 
- Användaren ska kunna se efter vilka frågor hen svarat rätt eller fel på
- Skapa if-else statement. Om questions.type == "checkbox", skapa checkboxar, else if skapa knappar, radiobuttons osv
. */

/* -------------------- VARIABLER ------------------- */

const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startGame);
const questionContainerElement = document.querySelector(".kort");
const answerButtons = document.getElementById("answer-buttons");
let currentQuestionIndex = 0;
const nextButton = document.getElementById("next-btn");
let correctAnswerCounter = 0;
let userAnswers = [];
// --------------- NEXT BUTTON funktionalitet ----------------------

/* 

1. När användaren klickar på "Nästa", kolla om nuvarande frågan är samma som frågoarrayens längd. Om det stämmer, avsluta spelet. 

2. Variablen currentQuestionAnswer sparar användarens svar. 

3. OM nuvarande frågan har en type radio: spara värdet av den checkade radiobutton i currentQuestionAnswer.answer

4. Annars, om currentQuestionIndex är type checkbox: Gör om det sparade värdet till en array och spara det checkade värdet

   Istället för att kolla alla frågor (jag vill inte göra en forof loop här tydligen)
   Kolla bara den fråga som visas just nu.
     for (const question of questions) {
       console.log(question);
  lista ut om det är en radiobutton eller checkbox


*/

nextButton.addEventListener("click", () => {
  console.log(questions.length);
  if (currentQuestionIndex === questions.length - 1) return alert("Klart!");
  const currentQuestionAnswer = {
    question: "",
    answers: [],
  };

  console.log(questions);

  currentQuestionAnswer.question = questions[currentQuestionIndex].question;

  if (questions[currentQuestionIndex].type === "radio") {
    console.log(
      currentQuestionIndex,
      document.querySelector("[type='radio']").value
    );

    currentQuestionAnswer.answers = [
      document.querySelector("[type='radio']:checked").value,
    ];
  } else if (questions[currentQuestionIndex].type === "checkbox") {
    currentQuestionAnswer.answer = Array.from(
      document.querySelectorAll("[type='checkbox']:checked")
    ).map((checkbox) => checkbox.value);
  }

  userAnswers.push(currentQuestionAnswer);
  currentQuestionIndex++;
  countPoints();
  setNextQuestion();
  console.log(userAnswers, "Användarsvar");
  //   if (questions.answers.correct === true) {
  //     console.log("Its working??");
  //   }
});

function countPoints() {
  for (let i = 0; i < userAnswers.length; i++) {
    let correct = userAnswers[i];
    console.log(correct.answers);
    for (let j = 0; j < correct.answers.length; j++) {
      let realCorrect = correct.answers[j];
      console.log(realCorrect, "HÄRÄRÄRÄR");
      if (realCorrect == "true") {
        correctAnswerCounter++;
        console.log(correctAnswerCounter, "LKSDKSDKJSDLKS");
      }
    }
  }
}

function hanteraSvar() {}

/* --------------- STARTA SPELET -------------------- */

function startGame() {
  console.log("Started");
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  nextButton.classList.remove("hide");
  setNextQuestion();
}

/* ------------------- VISA NÄSTA FRÅGA ------------------- */
/*   nextButton ska göra två saker.

1. Registrera vilket värde användaren valt och spara det i userAnswers.

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  radio.value
  setNextQuestion();

2. Kör setNextQuestion() . */

function setNextQuestion() {
  answerButtons.innerHTML = "";
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  const questionElement = document.getElementById("question"); // Denna träffar h2:an
  questionElement.innerText = question.question;

  if (question.type === "radio") {
    //Skapa radiobutton för varje svarsalternativ

    console.log("is radio button");
    question.answers.forEach((answer) => {
      let radio = document.createElement("label");
      radio.innerHTML =
        answer.text +
        ` <input value='${answer.correct}' type='radio' name='radio' />`;
      //   button.addEventListener("click", () => {});
      answerButtons.append(radio);
    });
  } else if (question.type === "checkbox") {
    console.log("is checkbox");
    question.answers.forEach((answer) => {
      let checkbox = document.createElement("label");
      checkbox.innerHTML =
        answer.text + ` <input value='${answer.correct}' type='checkbox'/>`;
      answerButtons.append(checkbox);
    });
  } else if (question.type === "trueFalse") {
    console.log("True or fasle");
    question.answers.forEach((answer) => {
      let bool = document.createElement("label");
      bool.innerHTML =
        answer.text +
        ` <input value='${answer.correct}' type='radio' name='bool' />`;
      answerButtons.append(bool);
    });
  }
}

// function selectAnswer(answer) {
//   const correct = answer.correct;
// }

/* -------- ----  QUESTIONS ARRAY ----- -------------- */

const questions = [
  {
    question: "Vilket år grundades Ankademin?",
    type: "radio",
    answers: [
      { text: "År 1929", correct: false },
      { text: "År 1994", correct: true },
      { text: "År 1849", correct: false },
      { text: "År 1999", correct: false },
    ],
  },

  {
    question: "Ankademin är bäst",
    type: "radio",
    answers: [
      { text: "Sant", correct: true },
      { text: "Falskt", correct: false },
    ],
  },

  {
    question: "Vilka personer jobbar INTE på Ankademin",
    type: "checkbox",
    answers: [
      { text: "Brandon Duarte Tsegai", correct: false },
      { text: "Brandon Ingram", correct: true },
      { text: "Brandon Knight", correct: true },
      { text: "Marlon Brando", correct: true },
    ],
  },
  {
    question: "Wilhelm studerar på Ankademin, vad studerar Wilhelm till?",
    type: "radio",
    answers: [
      { text: "Massör", correct: false },
      { text: "Hudvårdsspecialist", correct: false },
      { text: "Makeupartist", correct: false },
      { text: "Frontend utvecklare", correct: true },
    ],
  },
  {
    question: "bajs bajs bajs?",
    type: "radio",
    answers: [
      { text: "Massör (skalp)", correct: false },
      { text: "Hudvårdsspecialist", correct: false },
      { text: "Makeupartist", correct: false },
      { text: "Frontend utvecklare", correct: true },
    ],
  },
];
