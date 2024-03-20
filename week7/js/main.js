let CORRECT_ANSWER = "PRIDE"
let currentAttempt=0;
let currentAttemptCharacter=0;
let wordLength = 5;
let maxAttempts = 6
let GAME_STATE = "PLAYING"
let GAMES_RECORD = []


function createGrid(){
    const gridContainer = document.getElementById("grid-container")
    //remove all children
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    const rows = maxAttempts;
    const cols = wordLength;
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            let cell = document.createElement("div");
            cell.className = "grid-item attempt-"+i;
            cell.id = "cell-"+i+"-"+j;
            gridContainer.appendChild(cell);
        }
    }
}


function createKeyboard(){
    const QWERTY = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
    const keyBoard = document.getElementById("keyboard")
    //remove all children
    while (keyBoard.firstChild) {
        keyBoard.removeChild(keyBoard.firstChild);
    }
    for (i=0; i<QWERTY.length; i++) {
        let row = document.createElement("div")
        row.className = "keyboard-row"
        if (i==QWERTY.length-1) {
            let enter = document.createElement("div")
            enter.className = "enter button"
            enter.innerText = "ENTER"
            enter.id = "enter-button"
            row.appendChild(enter)
        }
        for (j=0; j<QWERTY[i].length; j++) {
            let letter = document.createElement("div")
            letter.className = "letter button"
            letter.innerText = QWERTY[i][j]
            letter.id = "letter-"+QWERTY[i][j]
            row.appendChild(letter)
        }
        if (i==QWERTY.length-1) {
            let backspace = document.createElement("div")
            //
            backspace.className = "backspace button"
            backspace.innerHTML = "<i class=\"material-icons\">&#xe14a;</i>"
            backspace.id = "backspace-button"
            row.appendChild(backspace)
        }
        keyBoard.appendChild(row)
    }
    const letters = document.getElementsByClassName("letter")
    for (let i=0; i<letters.length; i++) {
        letters[i].addEventListener("click", function() {
            if (currentAttemptCharacter >= wordLength || GAME_STATE !== "PLAYING"){
                return
            }
            clearAlert();
            let letter = this.innerText
            let cell = document.getElementById("cell-"+currentAttempt+"-"+currentAttemptCharacter)
            cell.innerText = letter
            currentAttemptCharacter++
        })
    }

    //Backspace functionality
    const backspace = document.getElementById("backspace-button")
    backspace.addEventListener("click", function() {
        if (currentAttemptCharacter > 0) {
            currentAttemptCharacter--
            let cell = document.getElementById("cell-"+currentAttempt+"-"+currentAttemptCharacter)
            cell.innerText = ""
            clearAlert();
        }
    })
}

function showHideAnswer(){
    const debugModeSwitch = document.getElementById("debug-mode")
    const debugModeDiv = document.getElementById("debug-mode-answer")
    if (debugModeSwitch.checked){
        debugModeDiv.innerText = "Answer: "+ CORRECT_ANSWER
        debugModeDiv.style.display = "block"
    } else {
        debugModeDiv.innerText = "";
        debugModeDiv.style.display = "none"
    }

}

function clearAlert(message, color=null){
    const alert = document.getElementById("alert-center")
    alert.innerText = ""
    alert.style.display = "none"

}

function showAlertInfo(message, color=null){
    const alert = document.getElementById("alert-center")
    if (color){
        alert.style.backgroundColor = color
    }
    alert.innerText = message
    alert.style.display = "block"
    // setTimeout(function(){
    //     alert.style.display = "none"
    // }, 3000)
}

async function validateAttempt(attempt){
    //Check if the attempt is a valid word
    const api_url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+attempt
    //don't love that this gives a console error if word is not found
    const response = await fetch(api_url)
    if (response.ok && response.status === 200){
        console.log(response.responseText)
        console.log("Word is valid")
        return true
    } else if (response.status === 404) {
        return false;
    }
}

async function submitAttempt(){
    if (currentAttemptCharacter < wordLength) {
        console.log("Please fill in all the letters")
        return
    }
    let attempt = ""
    for (let i=0; i<wordLength; i++){
        let attemptLetterElement = document.getElementById(`cell-${currentAttempt}-${i}`)
        let attemptLetter = attemptLetterElement.innerText
        attempt += attemptLetter;
    }

    const isAttemptWord  = await validateAttempt(attempt)
    if (!isAttemptWord && (attempt !== CORRECT_ANSWER)) {
        showAlertInfo("Please enter a valid word", "#FFFC00D0")
        return
    }

    for (let i=0; i<wordLength; i++){
        let attemptLetterElement = document.getElementById(`cell-${currentAttempt}-${i}`)
        let attemptLetter = attemptLetterElement.innerText

        if (attemptLetter === CORRECT_ANSWER[i]) {
            //change color to green
            attemptLetterElement.style.backgroundColor = "green"
        }else if (CORRECT_ANSWER.includes(attemptLetter)){
            attemptLetterElement.style.backgroundColor = "#FFA500"
        } else {
            attemptLetterElement.style.backgroundColor = "#FF000099"
            //disable keyboard element
            let letterElement = document.getElementById(`letter-${attemptLetter}`)
            letterElement.className = letterElement.className + " disabled"
            letterElement.style.pointerEvents = "none"

        }
    }

    if (attempt === CORRECT_ANSWER) {
        gameWon()
        console.log("You won!")
    }
    if (currentAttempt === maxAttempts-1) {
        gameLost()
        console.log("You lost!")
    }

    currentAttempt++;
    currentAttemptCharacter=0;
}

function gameWon(){
    showAlertInfo("You won!", "#00FF0099");
    GAME_STATE = "WON"
    GAMES_RECORD.push({outcome: "WIN", attempts: currentAttempt+1})
    calculateStats()
}

function gameLost(){
    showAlertInfo("You lost!", "#FF000099")
    GAME_STATE = "LOST"
    GAMES_RECORD.push({outcome: "LOST", attempts: currentAttempt+1})
    calculateStats()
}

async function startGame(){
    const response = await fetch("https://random-word-api.herokuapp.com/word?number=1&length=5")
    if (response.ok && response.status === 200){
        const data = await response.json()
        CORRECT_ANSWER = data[0].toUpperCase()
        GAME_STATE = "PLAYING"
        currentAttempt = 0
        currentAttemptCharacter = 0;
        createGrid()
        createKeyboard()
        showHideAnswer()

        const enter = document.getElementById("enter-button")
        enter.addEventListener("click", async function(){
            submitAttempt()
        })
        const debugSwitch = document.getElementById("debug-mode")
        debugSwitch.addEventListener("change", function(){
            showHideAnswer()
        })
    }
    console.log(CORRECT_ANSWER)
}

function calculateStats(){
    let nWins=0, nLosses=0, nAttempts=0;
    for (i=0; i<GAMES_RECORD.length; i++){
        if (GAMES_RECORD[i].outcome === "WIN"){
            nWins++
            nAttempts += GAMES_RECORD[i].attempts;
        } else {
            nLosses++
        }
    }

    let avg_attempts = nAttempts/nWins || 0

    document.getElementById("games-played").innerText = "Games Played: "+GAMES_RECORD.length
    document.getElementById("games-won").innerText = "Games Won: "+nWins
    document.getElementById("games-lost").innerText = "Games Lost: "+nLosses
    document.getElementById("avg-attempts").innerText = "Average Attempts: "+avg_attempts

}

(
    async function(){
        await startGame()
    }
)()


