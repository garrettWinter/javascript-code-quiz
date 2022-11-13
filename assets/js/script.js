/* Global Parameters*/
var startQuizBtn = document.querySelector('#startQuiz')
var globalTimer = document.querySelector('#timeRemainingPH')
var timeRemaining = 10; /* This will need to be moved into the start game function*/

/* Event Listen for Start Quiz button Click */
startQuizBtn.addEventListener("click", startTimer);

/* This funtction controls the timer */
function startTimer() {
    console.log("Start Quiz has been Clicked and startTimer function has been run");
    timer = setInterval(function () {
        console.log("setInterval has run, "+timeRemaining+" seconds remaining.");
        timeRemaining--;
        globalTimer.textContent=timeRemaining;
        /* This stops the clock once 0 has been reached  */
        if (timeRemaining === 0){
            clearInterval(timer);
            console.log("Time has hit 0, and timer has been cleared")
            /* Needs to trigger the loss function */
        }
    }, 1000);
}
/* Psedo Coding
Functions:
    Timer
    Play Game
    Win Game
    Lose Game
    Record Keeping (high Score Page)


*/