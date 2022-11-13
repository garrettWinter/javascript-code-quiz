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
        add GameOver Function when timer hits 0
    Play Game
        Add time to clock
        Copy question list to a un-asked variable
        Random Select a question
            will need to do a math calculation to ran select
            Move questions from un-asked to asked to prevent being repeated
            Right / Wrong logic
                if right
                    grant points 10 points
                Diplay a right or wrong message
            Loop to next question 
    GameOver
        Show user final score
        Diplay message "Great job"
        ask for users name
        user submits score
            writes to local stoage using a JSON stringify
            Redirects user to high score page
        
 
    Record Keeping (high Score Page)
        reads local store and displays using a JSON Parse

Extras if have extra time
    award extra points if questions awsered fast
        will require a second timer for the question
    
*/