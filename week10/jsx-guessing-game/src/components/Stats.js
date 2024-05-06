
function Stats(props) {

    function handleSubmit(e) {
        e.preventDefault();
        const numGuesses = parseInt(document.getElementById('numGuesses').value);
        props.setNumberToGuess(numGuesses);
        alert('Settings saved: ' + numGuesses + ' guesses allowed.');
    }

    const gamesPlayed = props.stats.length;
    const gamesWon = props.stats.filter(game => game.outcome === 'win').length;
    const averageNumGuesses = props.stats.reduce((acc, game) => acc + game.numGuesses, 0) / gamesPlayed;

    return (
        <div className={"stats-panel content"}>
            <h1>Stats</h1> <hr/>
            <table>
                <tbody>
                    <tr>
                        <td>Games Played:</td>
                        <td>{gamesPlayed}</td>
                    </tr>
                    <tr>
                        <td>Games Won:</td>
                        <td>{gamesWon}</td>
                    </tr>
                    <tr>
                        <td>Average Number of Attempts:</td>
                        <td>{averageNumGuesses.toPrecision(2)}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Stats;