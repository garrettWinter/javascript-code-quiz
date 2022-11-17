console.log("TestingConnection");
var initials = document.querySelector("#initals");
var submitRecord = document.querySelector("#submitRecord")
var unsavedScore;

function recordKeeping(event) {
    event.preventDefault();
    console.log("recordKeeping function has been triggered.");
    console.log("Name: "+initials.value);
    /* ADD IF STATMENT VALIDATING DETAILS HAVE BEEN ADDED */
    unsavedScore = localStorage.getItem("unsavedScore");
     console.log("Score: "+unsavedScore)

}

submitRecord.addEventListener("click",recordKeeping)

/*

Pseudo Coding:

    Record Keeping (high Score Page)
        reads local store and displays using a JSON Parse on load
        DONE -- ask for users name
        user submits score
            writes to local stoage using a JSON stringify
            update top 5 list


*/
