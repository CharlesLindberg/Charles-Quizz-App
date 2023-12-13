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
const answerButtons = document.querySelector(".answer-buttons");
let currentQuestionIndex = 0;
const nextButton = document.getElementById("next-btn");
let correctAnswerCounter = 0;
let userAnswers = [];
const sum = (array) => array.reduce((sum, acc) => sum + acc, 0);
const resultatDiv = document.querySelector(".resultDiv");

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
  const currentQuestionAnswer = {
    question: "",
    answer: "",
  };

  currentQuestionAnswer.question = questions[currentQuestionIndex].question;

  if (questions[currentQuestionIndex].type === "radio") {
    console.log(
      currentQuestionIndex,
      document.querySelector("[type='radio']").value,
      "Är detta en Radiobutton?"
    );

    const answerValue = document.querySelector("[type='radio']:checked").value; // Hämtar det checkade radio button-värdet
    currentQuestionAnswer.answer = parseInt(answerValue); // Gör om värdet till ett nummer (1 eller 0)

    // Om den nuvarande frågan är en checkbox-fråga. Gör om svaret från en nod.lista till en array med Array.from(). Gör om svaren till nummer och lagra resultatet i variablen nrOfCorrectAnswers. Jämför sedan nrOfCorrectAnswers med användarens svar (multiAnswerValue). OM dom är samma, ge currentQuestionAnswer.answer 1 och pusha upp det i
  } else if (questions[currentQuestionIndex].type === "checkbox") {
    const multiAnswerValueArray = Array.from(
      document.querySelectorAll("[type='checkbox']:checked")
    ).map((checkbox) => parseInt(checkbox.value));
    const nrOfCorrectAnswersArray = questions[currentQuestionIndex].answers.map(
      (answer) => {
        return answer.correct;
      }
    );
    const multiAnswerValue = sum(multiAnswerValueArray);
    const nrOfCorrectAnswers = sum(nrOfCorrectAnswersArray);

    if (multiAnswerValue === nrOfCorrectAnswers) {
      currentQuestionAnswer.answer = 1;
    } else {
      currentQuestionAnswer.answer = 0;
    }

    console.log({
      nrOfCorrectAnswers,
    });
    console.log({
      multiAnswerValue,
    });
  }

  userAnswers.push(currentQuestionAnswer);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    // kör funktion här?
    userAnswers.map(({ answer }) => {
      correctAnswerCounter += answer;
    });
    console.log({ correctAnswerCounter });

    return showResult();
    // return alert(
    //   `Du fick ${correctAnswerCounter} av ${questions.length} poäng`
    // );
  }

  //   countPoints();
  setNextQuestion();
  console.log(userAnswers, "userAnswers");
  console.log(currentQuestionAnswer);
});

/* -------------- Visa resultatet ------------------- */

function showResult() {
  const resultatRubrik = document.createElement("h2");
  resultatRubrik.innerHTML = `Du fick ${correctAnswerCounter} av ${questions.length} poäng`;
  questionContainerElement.appendChild(resultatRubrik);
  let h2 = document.createElement("h2");
  //   answerButtons.innerHTML = "";
  //   questionContainerElement.innerHTML = "KLAR! 🎉";

  if (correctAnswerCounter < 5) {
    h2.innerHTML = "Du fick underkänt";
    h2.classList.add("underkand");
    questionContainerElement.append(h2);
  } else if (correctAnswerCounter >= 5 && correctAnswerCounter < 7.5) {
    h2.innerHTML = "Du fick godkänt";
    h2.classList.add("bra");
    questionContainerElement.append(h2);
  } else {
    h2.innerHTML = "Du fick MVG!!";
    h2.classList.add("riktigtBra");
    questionContainerElement.append(h2);
  }

  userAnswers.forEach((answer) => {
    const paragraph = document.createElement("p");

    if (answer.answer === 1) {
      paragraph.classList.add("correct");
    } else {
      paragraph.classList.add("incorrect");
    }

    paragraph.innerHTML = answer.question;
    questionContainerElement.append(paragraph);
  });

  startOver();
}

function startOver() {
  //   questionContainerElement.innerHTML = "Klart";
  answerButtons.classList.add("hide");
  resultatDiv.classList.remove("hide");
  const startOverButton = document.createElement("button");
  startOverButton.classList.add("btn");
  startOverButton.innerHTML = "Start over";
  questionContainerElement.append(startOverButton);
}

// function resultat() {
//   if (`${correctAnswerCounter} > (${questions.length} / 2) `) {
//     return `Du fick godkänt! ${correctAnswerCounter} av ${questions.length} poäng`;
//   } else if ((${correctAnswerCounter} - 10) < 3 ) {
//     return `Du fick MVG, ${correctAnswerCounter} av ${questions.length} poäng`
//   }
// }

// Göra en funktion som skriver   `Du fick ${correctAnswerCounter} av ${questions.length} poäng` - använd correctAnswerCounter och questions.length som parametrar

/* ------------------ RÄKNA POÄNG ------------------ */

// function countPoints() {
//   for (let i = 0; i < userAnswers.length; i++) {
//     let correct = userAnswers[i];
//     console.log(correct.answers, "Svarade jag rätt?");
//     for (let j = 0; j < correct.answers.length; j++) {
//       let realCorrect = correct.answers[j];
//       console.log(realCorrect, "realCorrect :O");
//       if (realCorrect == "true") {
//         correctAnswerCounter++;
//         console.log(correctAnswerCounter, "Poängräknare..");
//       }
//     }
//   }
// }

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

/* ---------------------  QUESTIONS ARRAY -------------------- */

const questions = [
  {
    question: "Vilket år grundades Ankademin?",
    type: "radio",
    answers: [
      { text: "År 1929", correct: 0 },
      { text: "År 1994", correct: 1 },
      { text: "År 1849", correct: 0 },
      { text: "År 1999", correct: 0 },
    ],
  },

  {
    question: "Ankademin är bäst",
    type: "radio",
    answers: [
      { text: "Sant", correct: 1 },
      { text: "Falskt", correct: 0 },
    ],
  },

  {
    question: "Vilka personer jobbar INTE på Ankademin",
    type: "checkbox",
    answers: [
      { text: "Brandon Duarte Tsegai", correct: 0 },
      { text: "Brandon Ingram", correct: 1 },
      { text: "Brandon Knight", correct: 1 },
      { text: "Marlon Brando", correct: 1 },
    ],
  },
  {
    question: "Wilhelm studerar på Ankademin, vad studerar Wilhelm till?",
    type: "radio",
    answers: [
      { text: "Massör", correct: 0 },
      { text: "Hudvårdsspecialist", correct: 0 },
      { text: "Makeupartist", correct: 0 },
      { text: "Frontend utvecklare", correct: 1 },
    ],
  },
  {
    question: "bajs bajs bajs?",
    type: "radio",
    answers: [
      { text: "Massör (skalp)", correct: 0 },
      { text: "Hudvårdsspecialist", correct: 0 },
      { text: "Makeupartist", correct: 0 },
      { text: "Frontend utvecklare", correct: 1 },
    ],
  },
  {
    question: "Därför pluggar Willhelm till massör (välj flera alternativ)",
    type: "checkbox",
    answers: [
      { text: "Han gillar att massera håriga mäns ryggar", correct: 1 },
      { text: "Han har korviga fingrar", correct: 1 },
      { text: "Han gillar att arbeta med kroppen", correct: 0 },
      { text: "Massage är allt han kan", correct: 1 },
    ],
  },
  {
    question: "Det ska bli gott med en öl efter detta tycker Mackan",
    type: "radio",
    answers: [
      { text: "Det stämmer 🍻", correct: 1 },
      { text: "Inte alls", correct: 0 },
      { text: "Mackan dricker bara gin tonics", correct: 0 },
      { text: "Det ska bli direkt äckligt", correct: 0 },
    ],
  },
];

/* ----------------- DARK MODE ---------------------- */

// document.getElementById("dark-mode").addEventListener("click", () => {
//   document.body.classList.toggle("light");
//   document.querySelector("h1").classList.toggle("light");
//   document.getElementById("dark-mode").innerHTML = "Dark mode";
// });

function darkMode() {
  let x = document.getElementById("dark-mode");
  if (x.innerHTML === "Light mode") {
    x.innerHTML = "Dark mode";
    document.querySelector("h1").classList.add("light");
    document.body.classList.add("light");
    document.querySelector(".dark-mode-toggle").classList.add("light");
  } else {
    document.body.classList.remove("light");
    document.querySelector("h1").classList.remove("light");
    x.innerHTML = "Light mode";
    document.querySelector(".dark-mode-toggle").classList.remove("light");
  }
}

/* ------------------- VISA RESULTATET ---------------- */
