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
var highScore1 = document.querySelector("#highScore1");
var highScore2 = document.querySelector("#highScore2");
var highScore3 = document.querySelector("#highScore3");
var highScore4 = document.querySelector("#highScore4");
var highScore5 = document.querySelector("#highScore5");
var clearScoresBtn = document.querySelector("#clearRecord");
var toggleScores = document.querySelector("#toggleHighScores");

var feedBackDisplay;
var quizAnswer;
var timeRemaining;
var score = 0;
var timeOut = false;
var highScores = [];
var newScore;
var toggle = "hide"
const quizQuestions = [
    [
        "Which of these is a Boolean value?",
        ["456", "A scary place to rest", "True", "A string"],
        "option3"
    ],
    [
        "What does NaN mean?",
        ["Batman", "The value is undefined", "Value is null", "The value is Not a Number"],
        "option4"
    ],
    [
        "What is DOM stand for in JavaScript?",
        ["Document Object Model ", "Distributed Order Management", "Dissolved Organic Matter", "Design Out Maintenance"],
        "option1"
    ],
    [
        "What does the '===' operator mean?",
        ["Equals", "Strick Equals", "Not Equal to", "Greater than"],
        "option2"
    ],
    [
        "Which of these is a String?",
        ["123", "false", "A piece of fabric", "'JavaScript is fun'"],
        "option4"
    ],
    [
        "What does the '+=' operator do?",
        ["Takes the existing value and adds to it", "Takes the existing value and subtracts from it", "Short hand for a loop", "Makes the values equal"],
        "option1"
    ],
    [
        "What does the '&&' operator mean?",
        ["Means all values much match", "Mean only 1 values needs to match", "Means no values need to match", "Values will concatenate text together"],
        "option1"
    ],
    [
        "What does the '||' operator mean?",
        ["Means all values much match", "Mean only 1 values needs to match", "Means no values need to match", "Will concatenate text together"],
        "option2"
    ]
];

/* Event Listeners */
quizOptionsList.addEventListener("click", answerCheck);
startQuizBtn.addEventListener("click", playGame);

clearScoresBtn.addEventListener("click", clearScores);

function clearScores (event){
    localStorage.removeItem("allTimeHighScores");
}

/* Event Listener to submit score button Click */
submitScoreBtn.addEventListener("click", recordKeeping);
submitRecord.addEventListener("click", submitHighScore);
toggleScores.addEventListener("click", toggleHS);

function toggleHS() {
    if (toggle === "hide"){
        console.log("toggleHS-hide has run");
        toggle = "show";
        console.log(toggle);
        mainScoreBox.style.visibility = 'visible';
    } else if (toggle === "show"){
        console.log("toggleHS-show has run");
        toggle = "hide";
        mainScoreBox.style.visibility = 'hidden';
    }
}

function recordKeeping() {
    console.log("recordKeeping function has been triggered.");
    // unhide Highscore DIV
    mainScoreBox.style.visibility = 'visible';
    highScores = JSON.parse(localStorage.getItem("allTimeHighScores"));
    console.log(highScores);
    if (highScores === null) {
        return;
    };
    /*
    Update Display elements for highscores 
    */
    if (highScores.length > 0) {
        highScore1.textContent = (highScores[0][0] + " - " + highScores[0][1]);
    };

    if (highScores.length > 1) {
        highScore2.textContent = (highScores[1][0] + " - " + highScores[1][1]);
    };

    if (highScores.length > 2) {
        highScore3.textContent = (highScores[2][0] + " - " + highScores[2][1]);
    };

    if (highScores.length > 3) {
        highScore4.textContent = (highScores[3][0] + " - " + highScores[3][1]);
    };

    if (highScores.length > 4) {
        highScore5.textContent = (highScores[4][0] + " - " + highScores[4][1]);;
    };
    
};

/* This is the function to submit the score which will perform feild validation along with adding this to highScores array and local storage. */
function submitHighScore(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("submitHighScore function has been triggered.");
    if (initials.value.length === 0) {
        window.alert("Please enter initals before Submitting.");
        return;
    };
    newScore = [initials.value, score];
    if (highScores === null) {
        highScores = [newScore];
    } else {
        highScores.push(newScore);
    };
    console.log(highScores);
    localStorage.setItem("allTimeHighScores", JSON.stringify(highScores));
    recordKeeping();

};

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
        };
    }, 1000);
};

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
    };


};

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
};

function questionHandling() {
    console.log("Number of questions left in the quizQuestions pool is: " + quizQuestions.length);
    if (quizQuestions < 1) {
        console.log("Have run out of questions.");
        gameOver();
        return;
    };


    /* Generating a Random number for question selection */
    console.log("questionHandling function has been triggered");
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
};

function answerCheck(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("awnserCheck function has been tiggered");
    var clickedElement = event.target.id;
    console.log("Clicked Option was: " + clickedElement);
    console.log("Correct anwser was: " + quizAnswer);

    if (clickedElement === quizAnswer) {
        console.log("+++++correct Awnser was clicked+++++");
        timeRemaining += 10;
        globalTimer.textContent = timeRemaining;
        score += 25;
        console.log("Score is now: " + score);
        scoreDisplay.textContent = score;
        feedBackDisplay = "Correct!!! You have gained more 10 seconds!!";
        feedbackVar.textContent = feedBackDisplay;
        questionHandling();
    } else {
        console.log("-----incorrect Awnser was clicked-----");
        timeRemaining -= 10;
        globalTimer.textContent = timeRemaining;
        feedBackDisplay = "Thats incorrect, you have lost 10 seconds. Better luck next time!! ";
        feedbackVar.textContent = feedBackDisplay;
        questionHandling();
    };

};

/* Pseudo Coding
Requiremments:
    GameOver
        Show user final score
            Needs to be styled
                Update score to be final score once gameOver has triggered
    Fix high scores link
        Should hide/Show highscore div
    PlayAgain function
        trigger page reload
            bonus
                could set local storage variable to auto trigger autoPlay
    Hide Option Boxes until gameStarts


Extras (if time):
    Clean up console logs
    Find a background image
        use opacity on it to reduce attention?
    Put div over the placeholder buttons before quiz is started and outline:
        How much time
        How many questions
        How Scoring works
            You get 25 points and 10 additional seconds for each correct awnser. Each second you finish with is worth 5 addtional points.


    Hide Initals Text box and Submit button after submitting to prevent multiple submissions of same score.
*/


