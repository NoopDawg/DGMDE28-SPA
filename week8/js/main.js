const maxAttempts = 6;
const wordLength = 5;

function createGrid() {
    const gridItems = [];
    for (let i = 0; i < maxAttempts; i++) {
        for (let j = 0; j < wordLength; j++) {
            const cell = React.createElement('div', {
                className: 'grid-item attempt-' + i,
                id: 'cell-' + i + '-' + j,
            });
            gridItems.push(cell);
        }
    }
    return gridItems;
}

function createKeyboard() {
    const QWERTY = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
    const keyboardRows = QWERTY.map((row, rowIndex) => {
        const rowItems = [];
        if (rowIndex === QWERTY.length - 1) {
            rowItems.push(React.createElement('div', { className: 'enter button', id: 'enter-button' }, 'ENTER'));
        }
        row.split('').forEach(letter => {
            rowItems.push(React.createElement('div', { className: 'letter button', id: 'letter-' + letter }, letter));
        });
        if (rowIndex === QWERTY.length - 1) {
            rowItems.push(React.createElement('div', { className: 'backspace button', id: 'backspace-button' }, '<i class="material-icons">&#xe14a;</i>'));
        }
        return React.createElement('div', { className: 'keyboard-row' }, rowItems);
    });
    return keyboardRows;
}

const GridComponent = React.createElement('div', null, createGrid());
const KeyboardComponent = React.createElement('div', null, createKeyboard());

ReactDOM.render(GridComponent, document.getElementById('grid-container'));
ReactDOM.render(KeyboardComponent, document.getElementById('keyboard'));


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

function clearAlert(){
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
        return true
    } else if (response.status === 404) {
        return false;
    }
}

async function submitAttempt(){
    if (currentAttemptCharacter < wordLength) {
        showAlertInfo("Please fill in all characters", "#FFFC00D0")
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
    }
    if (currentAttempt === maxAttempts-1) {
        gameLost()
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

        clearAlert()
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


