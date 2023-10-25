const rhs = document.getElementById("RHS");
const lhs = document.getElementById("LHS");
const operator = document.getElementById("operator");
const usersInput = document.getElementById("users-input");
const btn = document.getElementById("btn");
const total = document.getElementById("total");

dynPopupMsg = document.getElementById('dyn-msg')

let results = [];
let score = 0;
let count = 0;
let totalQuestions = 5;

let currLHSValue = 0;
let currRHSValue = 0;
let currOperatorvalue = '';

function randomNumber(){
    return Math.floor(Math.random()*99);
}
function randomOperator(){
    operationsList=["+", "-", "/", "x"]
    return operationsList[Math.floor(Math.random()*operationsList.length)];
}
function evaluateResult(lhs, operator, rhs){
    if (operator=="+"){
        return lhs + rhs; 
    };
    if (operator=="-"){
        return lhs - rhs; 
    };
    if (operator=="/"){
        return lhs / rhs; 
    };
    if (operator=="x"){
        return lhs * rhs; 
    };
}
function verifyResult(actualResult, expectedResult){
    return Number(actualResult) == Number(expectedResult);
}
function increaseCount(){
    count++;
}
function generateNewQuestionValues() {
    currLHSValue = randomNumber();
    currRHSValue = randomNumber();
    currOperatorvalue = randomOperator();
}
function generateNewQuestion() {
    generateNewQuestionValues();
    lhs.innerHTML = currLHSValue;
    rhs.innerHTML = currRHSValue;
    operator.innerHTML = currOperatorvalue;
    count++;
    total.innerText = `${count} / ${totalQuestions}`;
    console.log(evaluateResult(currLHSValue, currOperatorvalue, currRHSValue));
}
function checkAnswer(inputVal) {
    return verifyResult(inputVal, evaluateResult(currLHSValue, currOperatorvalue, currRHSValue))
}
function showPopupWithMessage(msg) {
    dynPopupMsg.innerHTML = msg;
    showPopup();
}
function showPopup() {
    document.querySelector('.popup-wrapper').classList.add('show');
}
function hidePopup() {
    document.querySelector('.popup-wrapper').classList.remove('show');
}
function resultMessage(score, totalQuestions){
    const percentage = (score/totalQuestions)*100;
    if (percentage < 49){
        return "Low 😒"
    }
    else if (percentage < 74 && percentage >= 50){
        return "average 🤨"
    }
    else {
        return "wow 😊"
    }
}

// generate a ques on page load
generateNewQuestion();


btn.addEventListener('click', (e) => {
    if(count < (totalQuestions+1)) {
        inputVal = usersInput.value;
        if(!inputVal) {
            showPopupWithMessage('Please enter an answer');
            return;
        }
        if(checkAnswer(inputVal)) {
            score++;
        }
        generateNewQuestion();
        usersInput.value = ''
    } else {
        const scoreMsgHtml = `
            <p>You scored ${score} out of ${totalQuestions}</p>
            <p>${resultMessage(score, totalQuestions)}</p>
            <button class="btn" id="play-again">Play again!</button>
        `
        showPopupWithMessage(scoreMsgHtml);

        document.getElementById('play-again').addEventListener('click', () => {
            window.location.reload();
        })
    }
});
