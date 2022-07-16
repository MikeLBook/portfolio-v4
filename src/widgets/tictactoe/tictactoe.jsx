import React, {useEffect, useState} from 'react';
import './tictactoe.scss';

const TicTacToe = ({playSound}) => {
    const [player1Name, setPlayer1Name] = useState('player1')
    const [player2Name, setPlayer2Name] = useState('player2')
    const [board, setBoard] = useState(Array(9).fill(null))
    const [p1Turn, setP1Turn] = useState(true)
    const [winner, setWinner] = useState(false)
    const [turns, setTurns] = useState(1)

    const newGame = () => {
        playSound()
        setBoard(Array(9).fill(null))
        setP1Turn(true)
        setWinner(false)
        setTurns(1)
    }

    const handleClick = (index) => {
        if (board[index] === null && !winner) {
            playSound()
            setTurns(prevTurns => prevTurns + 1)
            p1Turn ? board[index] = 'X' : board[index] = 'O';
            setP1Turn(prev => !prev)
            checkForWinner();
        }
    }

    const checkForWinner = () => {
        const rows = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        rows.forEach(row => {
            if (board[row[0]] != null && board[row[0]] === board[row[1]] && board[row[0]] === board[row[2]]) {
                setWinner(true)
                window.alert('Winner!');
            }
        })
    }

    let message;
    if (winner) {
        message = <span>Game Over</span>
    } else if (turns === 10) {
        message = <span>Tie</span>
    } else {
        message = <p>{p1Turn ? `${player1Name}, it is your turn!` : `${player2Name}, it is your turn!`}</p>
    }

    return (
        <div className='ttt-container'>
            <fieldset>
                <legend>Controls</legend>
                <form>
                    <div>
                        <label>
                            P1 Username: 
                            <input type="text" name='player1' className="ttt-controls" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)}
                            autoComplete="off" />
                        </label>
                    </div>
                    <div>
                        <label>
                            P2 Username: 
                            <input type="text" name='player2' className='ttt-controls' value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)}
                            autoComplete="off" />
                        </label>
                    </div>
                    <div className='ttt-new' onClick={newGame}>New Game!</div>
                </form>
            </fieldset>
            <div className='console'>
                {message}
            </div>
            <div className='board'>
                <div className='square' onClick={() => handleClick(0)}>{board[0]}</div>
                <div className='square' onClick={() => handleClick(1)}>{board[1]}</div>
                <div className='square' onClick={() => handleClick(2)}>{board[2]}</div>
                <div className='square' onClick={() => handleClick(3)}>{board[3]}</div>
                <div className='square' onClick={() => handleClick(4)}>{board[4]}</div>
                <div className='square' onClick={() => handleClick(5)}>{board[5]}</div>
                <div className='square' onClick={() => handleClick(6)}>{board[6]}</div>
                <div className='square' onClick={() => handleClick(7)}>{board[7]}</div>
                <div className='square' onClick={() => handleClick(8)}>{board[8]}</div>
            </div>
        </div>    
    )
}

export default TicTacToe