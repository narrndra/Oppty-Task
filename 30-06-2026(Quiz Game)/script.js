let quizData = [

{
question:"Which company developed JavaScript?",
options:["Google","Microsoft","Netscape","Oracle"],
answer:"Netscape"
},

{
question:"Which keyword is used to declare variable?",
options:["let","constant","variable","hello"],
answer:"let"
},

{
question:"Which symbol used for comments?",
options:["//","**","##","%%"],
answer:"//"
},

{
question:"Which method converts JSON to object?",
options:["JSON.parse()","JSON.object()","JSON.convert()","JSON.add()"],
answer:"JSON.parse()"
},

{
question:"Which is array method?",
options:["push()","add()","insert()","plus()"],
answer:"push()"
},

{
question:"DOM stands for?",
options:["Document Object Model","Data Object Method","Document Open Method","None"],
answer:"Document Object Model"
},

{
question:"Which loop runs at least once?",
options:["for","while","do while","none"],
answer:"do while"
},

{
question:"Which operator checks equality?",
options:["==","++","--","&&"],
answer:"=="
},

{
question:"Which function prints output?",
options:["alert()","show()","print()","display()"],
answer:"alert()"
},

{
question:"JavaScript is?",
options:["Language","Database","Browser","Editor"],
answer:"Language"
}

];

let currentQuestion = 0;
let userAnswers = [];

// DOM

let startBtn = document.getElementById("start-btn");
let welcomeScreen = document.getElementById("welcome-screen");
let quizScreen = document.getElementById("quiz-screen");
let resultScreen = document.getElementById("result-screen");

let question = document.getElementById("question");
let options = document.getElementById("options");
let progress = document.getElementById("progress");

let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");
let submitBtn = document.getElementById("submit-btn");
let restartBtn = document.getElementById("restart-btn");


// Start Quiz

startBtn.addEventListener("click", function(){

welcomeScreen.classList.add("hide");
quizScreen.classList.remove("hide");

loadQuestion();

});


// Load Question

function loadQuestion(){

let q = quizData[currentQuestion];

progress.innerHTML = "Question " + (currentQuestion+1) + " of " + quizData.length;

question.innerHTML = q.question;

options.innerHTML = "";

q.options.forEach(function(option){

let div = document.createElement("div");

div.innerHTML = option;
div.classList.add("option");

if(userAnswers[currentQuestion] == option){
div.classList.add("selected");
}

div.addEventListener("click", function(){

userAnswers[currentQuestion] = option;

loadQuestion();

});

options.appendChild(div);

});


if(currentQuestion == 0){
prevBtn.disabled = true;
}else{
prevBtn.disabled = false;
}


if(currentQuestion == quizData.length-1){
nextBtn.classList.add("hide");
submitBtn.classList.remove("hide");
}else{
nextBtn.classList.remove("hide");
submitBtn.classList.add("hide");
}

}

// Next

nextBtn.addEventListener("click", function(){

if(currentQuestion < quizData.length-1){
currentQuestion++;
loadQuestion();
}

});

// Previous

prevBtn.addEventListener("click", function(){

if(currentQuestion > 0){
currentQuestion--;
loadQuestion();
}
});

// Submit

submitBtn.addEventListener("click", function(){

let score = 0;

for(let i=0;i<quizData.length;i++){

if(userAnswers[i] == quizData[i].answer){
score++;
}

}

showResult(score);

});

// Show Result

function showResult(score){

quizScreen.classList.add("hide");
resultScreen.classList.remove("hide");

let wrong = quizData.length - score;
let percent = (score/quizData.length)*100;

document.getElementById("score").innerHTML = "Score : " + score;
document.getElementById("correct").innerHTML = "Correct : " + score;
document.getElementById("wrong").innerHTML = "Wrong : " + wrong;
document.getElementById("percentage").innerHTML = "Percentage : " + percent + "%";


let message = "";

if(percent >= 80){
message = "Excellent!";
}
else if(percent >= 60){
message = "Great Job!";
}
else if(percent >= 40){
message = "Good Effort!";
}
else{
message = "Keep Practicing!";
}

document.getElementById("message").innerHTML = message;

}

// Restart

restartBtn.addEventListener("click", function(){

currentQuestion = 0;
userAnswers = [];

resultScreen.classList.add("hide");
welcomeScreen.classList.remove("hide");

});