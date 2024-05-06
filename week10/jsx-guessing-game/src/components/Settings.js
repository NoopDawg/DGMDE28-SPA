
function Settings(props) {

    function handleSubmit(e) {
        e.preventDefault();
        if (document.getElementById('numGuesses').value) {
            const numGuesses = parseInt(document.getElementById('numGuesses').value);
            props.setNumberOfAttempts(numGuesses);
        }
        if (document.getElementById('minRange').value && document.getElementById('maxRange').value) {
            const minRange = parseInt(document.getElementById('minRange').value);
            const maxRange = parseInt(document.getElementById('maxRange').value);
            props.setNumberRange([minRange, maxRange]);
            props.setNumberToGuess(props.numberGenerator(minRange, maxRange));
        }
        alert('Settings saved.');
    }

    return (
        <div className={"settings-panel content"}>
            <h1>Settings</h1> <hr/>
            <form>
                <h2>Guess Attempts</h2>
                <label htmlFor="numGuesses">Number of Guess Attempts:</label>
                <input type="number" id="numGuesses" defaultValue={props.numberOfAttempts}></input>

                <h2>Number Range:</h2>
                <label htmlFor="minRange">Min:</label>
                <input id="minRange" defaultValue={props.numberRange[0]}></input>
                <label htmlFor="maxRange">Max:</label>
                <input id="maxRange" defaultValue={props.numberRange[1]}></input>

                <br/><br/>
                <button onClick={(e)=>handleSubmit(e)}>Save</button>
            </form>

        </div>
    )
}

export default Settings;