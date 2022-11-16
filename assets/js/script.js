/* Global Parameters*/

/* FInd a good definiton for these buttons and text update variables*/
var startQuizBtn = document.querySelector('#startQuiz')
var globalTimer = document.querySelector('#timeRemainingPH')
var quizOptionsList = document.querySelector('#optionsList')
var scoreDisplay = document.querySelector('#scoreValue')

var questionVar = document.querySelector('#question')
var option1Var = document.querySelector('#option1')
var option2Var = document.querySelector('#option2')
var option3Var = document.querySelector('#option3')
var option4Var = document.querySelector('#option4')
var feedbackVar = document.querySelector('#awnserfeedback')

var timeRemaining;
var score = 0;
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
]

/* Event Listen for Start Quiz button Click */
startQuizBtn.addEventListener("click", playGame);

/* This funtction controls the timer */
function startTimer() {
    console.log("startTimer function has been triggered");
    timer = setInterval(function () {
        console.log("setInterval has triggered, "+timeRemaining+" seconds remaining.");
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

function playGame (){
    console.log(quizQuestions);
    var questionPool = quizQuestions;
    console.log("Below are the quizQuestions");
    console.log("------------");
    var askedQuestions = '';
    console.log("playGame function has been triggered");
    timeRemaining = 5; /* Sets the play time for the game */
    startTimer();
    questionHandling();

    function questionHandling (){
        /* Generating a Random number for question selection */
        console.log("questionHandling function has been triggered")
        var randomNum = Math.floor(Math.random() * questionPool.length);
        console.log("Random Number has been generated: "+randomNum);

        /* Updating the question that is being show to the user based on the random number that has been generated */
        var questionDisplay = questionPool[randomNum][0];
        console.log("Question to be displayed is: " +questionDisplay);
        questionVar.textContent=questionDisplay;
        
        var option1Display = questionPool[randomNum][1][0];
        console.log("Option 1 to be displayed is: "+option1Display);
        option1Var.textContent=option1Display;
        var option2Display = questionPool[randomNum][1][1];
        console.log("Option 2 to be displayed is: "+option2Display);
        option2Var.textContent=option2Display;
        var option3Display = questionPool[randomNum][1][2];
        option3Var.textContent=option3Display;
        console.log("Option 3 to be displayed is: "+option3Display);
        var option4Display = questionPool[randomNum][1][3];
        option4Var.textContent=option4Display;
        console.log("Option 4 to be displayed is: "+option4Display);

        var quizAwnser = questionPool[randomNum][2];
        console.log("The awnser is: "+quizAwnser);

        /* Splicing the question pool array to prevent question repeats */
        askedQuestions += questionPool.splice(randomNum, 1);
        console.log("Attempting Splice");
        console.log(questionPool);
        console.log(askedQuestions);
        
        /* Event listen for clicks during the playgame function */
        quizOptionsList.addEventListener("click", awnserCheck);
        
        function awnserCheck(e){
            console.log("awnserCheck function has been tiggered");
            var clickedElement = e.target.id;
            var feedBackDisplay;
            
            console.log("Clicked Option was: "+clickedElement);
            console.log("Correct anwser was: "+quizAwnser);

            if (clickedElement===quizAwnser){
                console.log("****correct Awnser was clicked****")
                timeRemaining += 10;
                score += 25;
                console.log("Score is now: "+score)
                scoreDisplay.textContent=score;
                feedBackDisplay = "Correct!!! You have gained more 10 seconds!!";
                feedbackVar.textContent =feedBackDisplay;
                questionHandling();
           } else {
                console.log("incorrect Awnser was clicked")
                timeRemaining -= 10;
                feedBackDisplay = "Thats incorrect, you have lost 10 seconds. Better luck next time!! ";
                feedbackVar.textContent=feedBackDisplay;
                questionHandling()
           }

        };

    }


}






/* Pseudo Coding
Functions:
    Timer
        add GameOver Function when timer hits 0
        Stop at 0
        Prevent multiple triggers
    Play Game
        DONE -- Add time to clock
        DONE -- Copy question list to a un-asked variable
        DONE -- Random Select a question
            DONE -- will need to do a math calculation to ran select
            DONE -- Move questions from un-asked to asked to prevent being repeated
    awnserCheck
        if right
            grant points points
            DONE -- Diplay a right messages
            DONE -- Loop to next question 
        DONE -- If wrong
            DONE -- remove 10 seconds from clock
            DONE -- Loop to next question        
    GameOver
        When time runs out or out of questions
        Show user final score
        Diplay message "Great job" message
        ask for users name
        user submits score
            writes to local stoage using a JSON stringify
            Redirects user to high score page
        
 
    Record Keeping (high Score Page)
        reads local store and displays using a JSON Parse

Extras if have extra time
    award extra points if questions awsered fast
        will require a second timer for the question
    Add 3 or 5 second fade to feedback
    Look to see if sounds can be added
        Correct, Incorrect, Game done
    Find a background image
        use opacity on it to reduce attention?
*/


