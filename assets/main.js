const data = [
  {
    question: "What does HTML stand for?",
    mcqs: ["Hyper Text Markup Language", "Hyper Transfer Markup Language", "Hyperlink and Text Markup Language", "High Tech Markup Language"],
    answer: 0
  },
  {
    question: "Which programming language is often used for building the structure of a webpage?",
    mcqs: ["JavaScript", "Python", "HTML", "CSS"],
    answer: 2,
  },
  {
    question: "What is the purpose of CSS in web development?",
    mcqs: ["Handling server-side requests", "Defining the style and layout of a webpage", "Managing databases", "Executing client-side scripts"],
    answer: 1,
  },
  {
    question: "Which of the following is a version control system?",
    mcqs: ["Photoshop", "Git", "jQuery", "Bootstrap"],
    answer: 1,
  },
  {
    question: "What is the primary use of the 'for' loop in programming?",
    mcqs: ["Declaring variables", "Iterating over a sequence of elements", "Defining functions", "Making decisions in code"],
    answer: 1,
  },
  {
    question: "In JavaScript, what is the purpose of the 'alert' function?",
    mcqs: ["Displaying a message box with a specified message", "Performing mathematical calculations", "Creating a loop", "Defining a variable"],
    answer: 0,
  },
  {
    question: "Which file format is commonly used for storing data in a tabular form?",
    mcqs: ["XML", "JSON", "CSV", "TXT"],
    answer: 2,
  },
  {
    question: "What does the acronym API stand for in web development?",
    mcqs: ["Application Programming Interface", "Advanced Program Integration", "Automated Protocol Interaction", "Application Protocol Interface"],
    answer: 0,
  },
  {
    question: "Which of the following is a backend programming language?",
    mcqs: ["HTML", "JavaScript", "Ruby", "CSS"],
    answer: 2,
  },
  {
    question: "What is the purpose of the SQL language?",
    mcqs: ["Styling web pages", "Querying and managing databases", "Creating animations", "Handling client-side interactions"],
    answer: 1,
  }
];

let questionNo = document.getElementById("questionNo");
let score = document.getElementById("score");
let question = document.getElementById("question");
let mcqDiv = document.getElementById("mcqDiv");
let buttonDiv = document.getElementById("buttonDiv");
let navBtn = document.getElementById("navBtn");
let questioncount = 0;
score.innerHTML = 0;
let givenAnswers = {};

function renderQuestion() {
  let navRenderBtn;
  questionNo.innerHTML = questioncount + 1;
  question.innerHTML = data[questioncount].question;
  mcqDiv.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    mcqDiv.innerHTML += `
      <button type="button" class="w-full border-slate-400 p-3 rounded text-start mt-3 border" onclick="getVerify(${i})">${data[questioncount].mcqs[i]}</button>
    `;
  }
  let parsedkeysArray = [];
  Object.entries(givenAnswers).forEach(([key, value]) => {
    let parsedkeys = parseInt(key);
    parsedkeysArray.push(parsedkeys);
  });
  if (parsedkeysArray.includes(questioncount)) {
    getVerify(givenAnswers[questioncount])
    navRenderBtn = false;
  } else { navRenderBtn = true; }
  if (questioncount < data.length - 1) {
    buttonDiv.innerHTML = `
    <button class="bg-slate-900 rounded-sm py-2 px-4 text-white" id="next" onclick="nextBtn()">
      Next
    </button>
    `
  } else {
    buttonDiv.innerHTML = `
        <button class="bg-slate-900 rounded-sm py-2 px-4 text-white" id="next" onclick="nextBtn()">
          Submit
        </button>
        <button class="bg-slate-900 rounded-sm py-2 px-4 text-white" id="next" onclick="reset()">
          Reset
        </button>
    `
  }
  if (navRenderBtn) {
    for (let i = 0; i < 10; i++) {
      let btnColor = "bg-green-500";
      if (parsedkeysArray.includes(i)) {
        navBtn.innerHTML += `
              <button onclick="btnClick(${i + 1})" type="button" class=" w-16 ${btnColor} py-2 border-2 rounded-sm">${i + 1}</button>
          `
      } else {
        navBtn.innerHTML += `
              <button onclick="btnClick(${i + 1})" type="button" class="w-16 py-2 border-2 rounded-sm">${i + 1}</button>
          `
      }
    }
  }
}

renderQuestion();

function getVerify(num) {
  const bgColor = num === data[questioncount].answer ? "bg-green-400" : "bg-red-400";
  const buttons = document.querySelectorAll("#mcqDiv button");
  buttons.forEach((button, i) => {
    button.className = `${i === num ? bgColor : ''} w-full border-slate-400 p-3 rounded text-start mt-3 border`;
  });

  let parsedkeysArray = [];
  Object.entries(givenAnswers).forEach(([key, value]) => {
    let parsedkeys = parseInt(key);
    parsedkeysArray.push(parsedkeys);
  });

  if (num === data[questioncount].answer) {
    if (parsedkeysArray.includes(questioncount) && givenAnswers[questioncount] === data[questioncount].answer) {
      score.innerHTML = parseInt(score.innerHTML) - 1;
    }
    score.innerHTML = parseInt(score.innerHTML) + 1;
  } else if (parsedkeysArray.includes(questioncount) && givenAnswers[questioncount] === data[questioncount].answer) {
    score.innerHTML = parseInt(score.innerHTML) - 1;
  }
  givenAnswers[questioncount] = num;
  navBtnfn();
}

function navBtnfn() {
  let parsedkeysArray = [];
  Object.entries(givenAnswers).forEach(([key, value]) => {
    let parsedkeys = parseInt(key);
    parsedkeysArray.push(parsedkeys);
  });
  navBtn.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    let btnColor = "bg-green-500";
    if (parsedkeysArray.includes(i)) {
      navBtn.innerHTML += `
            <button onclick="btnClick(${i + 1})" type="button" class=" w-16 ${btnColor} py-2 border-2 rounded-sm">${i + 1}</button>
        `
    } else {
      navBtn.innerHTML += `
            <button onclick="btnClick(${i + 1})" type="button" class="w-16 py-2 border-2 rounded-sm">${i + 1}</button>
        `
    }
  }
}

function nextBtn() {
  questioncount++;
  if (questioncount < data.length) {
    navBtn.innerHTML = "";
    renderQuestion();
  } else {document.getElementById("submitRes").innerHTML = `
  <h2 class="text-2xl sm:text-3xl mt-5 text-blue-500">
    Congratulations, You have successfully completed the test. 
  </h2>
  <p class="text-xl mt-3 mb-3 text-indigo-600">
    You have scored ${score.innerHTML} out of 10
  </p>
`
  }
}

function reset() {
  document.getElementById("submitRes").innerHTML = "";
  questioncount = 0;
  score.innerHTML = 0;
  givenAnswers = {};
  navBtn.innerHTML = "";
  renderQuestion();
}

function btnClick(index) {
  questioncount = index - 1;
  navBtn.innerHTML = "";
  renderQuestion();
}
