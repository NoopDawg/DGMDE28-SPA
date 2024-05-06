import './App.css';
import Settings from './components/Settings';
import Stats from './components/Stats';
import {Link, Routes, Route} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {useState} from 'react';

function Game(props) {
    const numberOfAttempts = props.numberOfAttempts;
    const setNumberOfAttempts = props.setNumberOfAttempts;
    const numberToGuess = props.numberToGuess;
    const setNumberToGuess = props.setNumberToGuess;
    const numberRange = props.numberRange;
    const stats = props.stats;
    const setStats = props.setStats;
    const guess = props.guess;
    const setGuess = props.setGuess;
    const remainingGuesses = props.remainingGuesses;
    const setRemainingGuesses = props.setRemainingGuesses;
    const status = props.status;
    const setStatus = props.setStatus;

    const [guessHistory, setGuessHistory] = [{guess: '', status: '', remainingGuesses: ''}]
    // console.log(numberOfAttempts);

    const handleGuess = () => {
        const num = parseInt(guess);

        console.log(numberToGuess);
        if (num > numberRange[1] || num < numberRange[0]) {
            alert(`Number must be between ${numberRange[0]} and ${numberRange[1]}.`);
            return;
        }
        let status = '';
        if (num === numberToGuess) {
            setStatus('Correct! You won.');
            const num_guesses = numberOfAttempts - remainingGuesses + 1;
            const newStats = [...stats, {outcome: 'win', numGuesses: num_guesses}]
            setStats(newStats);
            setRemainingGuesses(0);
        } else if (remainingGuesses - 1 === 0) {
            setStatus(`Out of guesses! The number was ${numberToGuess}.`);
            const newStats = [...stats, {outcome: 'loss', numGuesses: null}]
            setStats(newStats);
            setRemainingGuesses(remainingGuesses - 1);
        } else {
            if (num > numberToGuess) {
                setStatus('Too high!');
            } else {
                setStatus('Too low!');
            }
            setRemainingGuesses(remainingGuesses - 1);
        }
    };

    const handleNewGame = () => {
        setNumberToGuess(props.numberGenerator(numberRange[0], numberRange[1]));
        setRemainingGuesses(10);
        setStatus('');
        setGuess('');
    };

    return (
        <div className={'game-panel content'}>
            <h1>Guess the Number!</h1>
            <div className={'padding-bottom'}>
                <input type="number" value={guess} onChange={e => setGuess(e.target.value)}/>
                <button onClick={handleGuess} disabled={remainingGuesses === 0}>Guess</button>
            </div>
            <button onClick={handleNewGame}>New Game</button>
            <div>
                <p>Status: {status}</p>
            </div>
            <p>Remaining Guesses: {remainingGuesses}</p>
        </div>
    );
}

function MyApp() {
    const [numberOfAttempts, setNumberOfAttempts] = useState(10);
    const [numberRange, setNumberRange] = useState([1, 100]);
    const [stats, setStats] = useState([])
    const [guess, setGuess] = useState('');
    const [status, setStatus] = useState('');
    const [remainingGuesses, setRemainingGuesses] = useState(numberOfAttempts);
    const numberGenerator = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min
    }
    const [numberToGuess, setNumberToGuess] = useState(12)

    return (
        <div id={'content'}>
            <nav>
                <Link to="/">Game</Link> | <Link to="/settings">Settings</Link> | <Link to="/stats">Stats</Link>
            </nav>
            <Routes>
                <Route path="/" element={
                    <Game numberOfAttempts={numberOfAttempts} setNumberOfAttempts={setNumberOfAttempts}
                          numberToGuess={numberToGuess} setNumberToGuess={setNumberToGuess}
                          numberRange={numberRange} numberGenerator={numberGenerator}
                          stats={stats} setStats={setStats}
                          guess={guess} setGuess={setGuess}
                          status={status} setStatus={setStatus}
                          remainingGuesses={remainingGuesses} setRemainingGuesses={setRemainingGuesses}
                    />
                }/>
                <Route path="/settings" element={
                    <Settings numberOfAttempts={numberOfAttempts} setNumberOfAttempts={setNumberOfAttempts}
                              numberRange={numberRange} setNumberRange={setNumberRange}
                              setNumberToGuess={setNumberToGuess} numberGenerator={numberGenerator}/>}/>
                <Route path="/stats" element={
                    <Stats stats={stats}
                    />}/>
            </Routes>
        </div>
    )
}


function App() {
    return (
        <Router>
            <MyApp/>
        </Router>
    );
}

export default App;
