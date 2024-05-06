//components for Tic Tac Toe - JSX version
import { useState, useEffect } from "react";
import "./app_ttt.css"


function Square(props)
{
    return <button className = 'ttt-square' onClick={props.onclick} >{props.value}</button>
}


function Board()
{
    var initArray = Array(9).fill(' ');
    const [squares, setSquares] = useState(initArray);
    const [turn, setTurn] = useState('X')
    const [endGame, setEndGame] = useState(false)
    const [message, setMessage] = useState('&nbsp;')
    
    
    function handleSquareClick(i)
    {
        if (!endGame && squares[i]===' ') 
        {
            setTurn(turn==='X' ? 'O' : 'X')
           // squares[i]=turn
            setSquares((sq)=>{
                let begin= sq.slice(0,i);
                let end = sq.slice(i+1);
                return ([...begin,turn,...end])} )
        }
    }
    
    useEffect(()=>
    {
        //console.log(squares)
        var [a,b,c,d,e,f,g,h,i] = squares;
	           var combos = [ 
               [a,b,c].join(''),
			   [d,e,f].join(''),
			   [g,h,i].join(''),
			   [a,d,g].join(''),
			   [b,e,h].join(''),
			   [c,f,i].join(''),
			   [a,e,i].join(''),
			   [c,e,g].join('')
			 ]
        var gameOver=true;
        if (combos.indexOf("XXX") !== -1)
            setMessage("X Wins!");  

        else if (combos.indexOf("OOO") !== -1)
            setMessage("O Wins!");  

        else if (squares.indexOf(' ')===-1)
            setMessage("It's a stalemate!")

        else
            gameOver = false;
        
        setEndGame(gameOver);
   },[squares])
    
    function restart()
    {
        setSquares(initArray)  
        setEndGame(false)
    }

    function Squares()
    {
        var bunchOfSquares = [];
        for (let i = 0; i<9; i++)
            bunchOfSquares.push(<Square key= {i} value= {squares[i]} 
                                    onclick = {()=>{
                                            handleSquareClick(i); 
                                                } }
                            />) 
        return <div className="ttt-board">{bunchOfSquares}</div>;
    }

    function Message()
    {
        return <div className= {endGame?'ttt-message':'ttt-message noShow'}>{message}</div>
    }

    function PlayAgainButton()
    {
        return <button className={endGame?'playAgain':'noShow'} onClick= {()=>restart()}>Play Again?</button>
    }
   
    
    return (<div id='game'>
            <Message />
            <Squares />
            <PlayAgainButton />
           </div>
           );
}


export function MyApp()
{
		return <Board  />  
}