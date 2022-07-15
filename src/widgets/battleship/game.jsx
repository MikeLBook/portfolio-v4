import React, {useState, useEffect} from 'react';
import Square from './components/square.jsx'
import {getShipCoordinates} from './bsFunctions.js';
import './battleship.scss';

const Battleship = () => {
    const [playerShipCoordinates, setPlayerShipCoordinates] = useState(null)
    const [cpuShipCoordinates, setCPUShipCoordinates] = useState(null)
    const [turn, setTurn] = useState('player')
    const [gameCount, setGameCount] = useState(0)
    const [playerScore, setPlayerScore] = useState(0)
    const [cpuScore, setCPUScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        if (playerScore === 17) {
            setGameOver(true)
            alert('Player 1 Wins!')
        }
        if (cpuScore === 17) {
            setGameOver(true)
            alert('CPU Wins!')
        }
    }, [playerScore, cpuScore])

    const newGame = () => {
        setGameOver(false)
        setGameCount(prevGameCount => prevGameCount + 1)
        setPlayerShipCoordinates(getShipCoordinates())
        setCPUShipCoordinates(getShipCoordinates())
    }

    const handleBoardClick = (successfulHit) => { 
        if (successfulHit) {
            if (turn === 'player') {
                setPlayerScore(prevScore => prevScore + 1)
            } else {
                setCPUScore(prevScore => prevScore + 1)
            }
        }
        setTurn(prevTurn => prevTurn === 'player' ? 'cpu' : 'player')
    }

    let playerBoard = [];
    let cpuBoard = [];

    if (playerShipCoordinates && cpuShipCoordinates) {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                playerBoard.push(
                    <Square 
                        key={`player-${x}-${y}-game${gameCount}`} 
                        isShipLocation={playerShipCoordinates.some(coordinate => coordinate.x === x && coordinate.y === y)}
                        isPlayerBoard={true}
                        turn={turn}
                        handleBoardClick={handleBoardClick}
                        baseColor={playerShipCoordinates.some(coordinate => coordinate.x === x && coordinate.y === y) ? 'blue' : 'white'}
                        isGameOver={gameOver}
                    />
                )

                cpuBoard.push(
                    <Square 
                        key={`cpu-${x}-${y}-game${gameCount}`} 
                        isShipLocation={cpuShipCoordinates.some(coordinate => coordinate.x === x && coordinate.y === y)}
                        isPlayerBoard={false}
                        turn={turn}
                        handleBoardClick={handleBoardClick}
                        baseColor={'white'}
                        isGameOver={gameOver}
                    />
                )
            }
        }
    }


    return (
        <div className='bs-container'>
            <div className='bs-newGame' onClick={newGame}>New Game</div>
            <div className='bs-boards'>
                <div>
                    <div className='title mt-5 bs-title'>Your Ships</div>
                    <div className='bs-board'>
                        {playerBoard}
                    </div>
                </div>
                <div>
                    <div className='title mt-5 bs-title'>CPU Ships</div>
                    <div className='bs-board'>
                        {cpuBoard}
                    </div>
                </div>
            </div>         
        </div>
    )
}

export default Battleship