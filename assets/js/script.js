/* Global Parameters*/

/* FInd a good definiton for these buttons and text update variables*/
var startQuizBtn = document.querySelector('#startQuiz');
var globalTimer = document.querySelector('#timeRemainingPH');
var quizOptionsList = document.querySelector('#optionsList');
var scoreDisplay = document.querySelector('#scoreValue');
var optionsDisplay = document.querySelector('#optionsList');
var gameOverText = document.querySelector('#gameOverP');
var submitScoreBtn = document.querySelector('#submitScore');
var questionVar = document.querySelector('#question');
var option1Var = document.querySelector('#option1');
var option2Var = document.querySelector('#option2');
var option3Var = document.querySelector('#option3');
var option4Var = document.querySelector('#option4');
var feedbackVar = document.querySelector('#awnserfeedback');
var initials = document.querySelector("#initals");
var submitRecord = document.querySelector("#submitRecord");

var feedBackDisplay;
var quizAnswer;
var timeRemaining;
var score = 0;
var timeOut = false;
var highScores = [];
var newScore;
const quizQuestions = [
    [
        "what is 2 + 2",
        [1, 2, 3, 4],
        'option4'
    ],
    [
        "what is 4 + 4",
        [1, 2, 8, 4],
        'option3'
    ],
    [
        "what is 5 + 5",
        [5, 10, 15, 20],
        'option2'
    ],
    [
        "what is 10 + 10",
        [20, 10, 80, 40],
        'option1'
    ]
];

/* Event Listeners */
quizOptionsList.addEventListener("click", answerCheck);
startQuizBtn.addEventListener("click", playGame);

/* Event Listener to submit score button Click NEED TO REVIEW THESE AND CLEAN THIS UP!!!!!*/
submitScoreBtn.addEventListener("click", recordKeeping);
submitRecord.addEventListener("click", submitHighScore)

function recordKeeping() {
    console.log("recordKeeping function has been triggered.");
    // unhide Highscore DIV
    highScores = JSON.parse(localStorage.getItem("allTimeHighScores",));
    console.log(highScores);
   
    /*
    Update Display elements for highscores 
    */

}

/* This is the function to submit the score which will perform feild validation along with adding this to highScores array and local storage. */
function submitHighScore(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("submitHighScore function has been triggered.");
    if (initials.value.length === 0) {
        window.alert("Please enter initals before Submitting.");
        return;
    };
    newScore = {
        initials: initials.value,
        score: score
    };
    highScores.push(newScore);
    console.log(highScores);
    localStorage.setItem("allTimeHighScores",JSON.stringify(highScores));
    recordKeeping();

}

/* This funtction controls the timer */
function startTimer() {
    console.log("startTimer function has been triggered");
    timer = setInterval(function () {
        timeRemaining--;
        globalTimer.textContent = timeRemaining;
        /* This stops the clock once 0 has been reached  */
        if (timeRemaining <= 0) {
            clearInterval(timer);
            console.log("Time has hit 0, and timer has been cleared")
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    console.log("gameOver function has been triggered");
    clearInterval(timer);
    optionsDisplay.style.visibility = 'hidden';
    startQuizBtn.textContent = "Play Again";
    startQuizBtn.style.visibility = 'visible';
    submitScoreBtn.style.visibility = 'visible';
    submitScore.style.display = 'inline';
    feedBackDisplay = "";
    feedbackVar.textContent = feedBackDisplay;
    questionVar.textContent = "Game Over";
    score += (timeRemaining * 5);
    scoreDisplay.textContent = score;
    console.log("Final Score is: " + score);
    if (timeRemaining <= 0) {
        console.log("Ending Time remaining: " + timeRemaining);
        gameOverText.textContent = "Oh no, you have ran out of time!";
    } else {
        gameOverText.textContent = "Congratulations you have made it through all of the questions!";
    }


}

function playGame() {
    console.log("playGame function has been triggered");
    startQuizBtn.style.visibility = 'hidden';
    submitScoreBtn.style.visibility = 'hidden';
    console.log("Number of questions in the quizQuestions pool is: " + quizQuestions.length);
    var askedQuestions = '';
    timeRemaining = 10; /* Sets the play time for the game */
    globalTimer.textContent = timeRemaining;
    startTimer();
    questionHandling();
}

function questionHandling() {
    console.log("Number of questions left in the quizQuestions pool is: " + quizQuestions.length);
    if (quizQuestions < 1) {
        console.log("Have run out of questions.");
        gameOver();
        return;
    }


    /* Generating a Random number for question selection */
    console.log("questionHandling function has been triggered")
    var randomNum = Math.floor(Math.random() * quizQuestions.length);

    /* Updating the question that is being shown to the user based on the random number that has been generated */
    var questionDisplay = quizQuestions[randomNum][0];
    questionVar.textContent = questionDisplay;

    var option1Display = quizQuestions[randomNum][1][0];
    option1Var.textContent = option1Display;
    var option2Display = quizQuestions[randomNum][1][1];
    option2Var.textContent = option2Display;
    var option3Display = quizQuestions[randomNum][1][2];
    option3Var.textContent = option3Display;
    var option4Display = quizQuestions[randomNum][1][3];
    option4Var.textContent = option4Display;

    quizAnswer = quizQuestions[randomNum][2];
    console.log("The awnser is: " + quizAnswer);

    /* Splicing the question pool array to prevent question repeats */
    quizQuestions.splice(randomNum, 1);
}

function answerCheck(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("awnserCheck function has been tiggered");
    var clickedElement = event.target.id;
    console.log("Clicked Option was: " + clickedElement);
    console.log("Correct anwser was: " + quizAnswer);

    if (clickedElement === quizAnswer) {
        console.log("+++++correct Awnser was clicked+++++")
        timeRemaining += 10;
        globalTimer.textContent = timeRemaining;
        score += 25;
        console.log("Score is now: " + score)
        scoreDisplay.textContent = score;
        feedBackDisplay = "Correct!!! You have gained more 10 seconds!!";
        feedbackVar.textContent = feedBackDisplay;
        questionHandling();
    } else {
        console.log("-----incorrect Awnser was clicked-----")
        timeRemaining -= 10;
        globalTimer.textContent = timeRemaining;
        feedBackDisplay = "Thats incorrect, you have lost 10 seconds. Better luck next time!! ";
        feedbackVar.textContent = feedBackDisplay;
        questionHandling()
    }

};

/* Pseudo Coding
Requiremments:
    Questions
        These still need to be created and added to the array.
    GameOver
        Show user final score
            Needs to be styled
    Record Keeping (high Score Page)
        update top 5 list
        Need clear high score button
    Fix high scores link
        Should hide/Show highscore div



Extras (if time):
    Clean out console logs
    Add 3 or 5 second fade to feedback
    Look to see if sounds can be added
        Correct, Incorrect, Game done
    Find a background image
        use opacity on it to reduce attention?
    Clean up assets
        Remove highscore html and js files
    Change questions array to objects
    Break up score from questions and time on submit score div
    Put div over the placeholder buttons before quiz is started and outline:
        How much time
        How many questions
        How Scoring works
    Timer
        Prevent multiple triggers
    PlayAgain function
        trigger page reload
            bonus
                could set local storage variable to auto trigger autoPlay
    Hide Initals Text box and Submit button after submitting to prevent multiple submissions of same score.
*/


