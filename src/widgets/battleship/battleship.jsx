import React, {useState, useEffect, useRef} from 'react';
import Square from './components/square.jsx'
import battleship from './battleship.js'
import './battleship.scss';

const Battleship = ({playSound}) => {
    const [playerShipCoordinates, setPlayerShipCoordinates] = useState(null) // array of objects with keys for x and y
    const [cpuShipCoordinates, setCPUShipCoordinates] = useState(null) // array of objects with keys for x and y
    const [turn, setTurn] = useState('player') // string with the value of 'player' or 'cpu'
    const [gameCount, setGameCount] = useState(0) // leverages list component keys to reset child component state
    const [playerScore, setPlayerScore] = useState(0) // incremented after successful hits, 17 hits to win
    const [cpuScore, setCPUScore] = useState(0) // incremented after successful hits, 17 hits to win
    const [gameOver, setGameOver] = useState(true) // boolean representing whether or not the current game has ended
    const [cpuClickCoordinates, setCpuClickCoordinates] = useState(null) // an object with keys for x and y
    const [intervalId, setIntervalId] = useState(null)

    // check win condition on score change
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

    // handle turn loop
    useEffect(() => {
        if (turn === 'cpu') {
            if (!intervalId) {
                const interval = setInterval(() => {
                    setCpuClickCoordinates(battleship.useCoordinate())
                }, 1500)
                setIntervalId(interval)
            }
        } else {
            clearInterval(intervalId)
            setIntervalId(null)
            setCpuClickCoordinates(null)
        }

        return (interval) => {clearInterval(interval); setIntervalId(null);}
    }, [turn])

    // reset state to initial game values
    const newGame = () => {
        playSound()
        setGameCount(prevGameCount => prevGameCount + 1)
        setPlayerScore(0)
        setCPUScore(0)
        setPlayerShipCoordinates(battleship.getRandomizedShipCoordinates())
        setCPUShipCoordinates(battleship.getRandomizedShipCoordinates())
        battleship.resetAvailableCoordinates()
        setGameOver(false)
    }

    const handlePlayerClick = (successfulHit) => { 
        playSound()
        if (successfulHit) {
            setPlayerScore(prevScore => prevScore + 1)
        } else {
            setTurn('cpu')
        }
    }

    const handleCPUClick = (successfulClick, successfulHit) => {
        if (successfulClick) { 
            playSound()
            if (successfulHit) {
                setCPUScore(prevScore => prevScore + 1)
                battleship.reportSuccessfulHit()
            } else {
                battleship.reportMissedHit()
                setTurn('player')
            }
        } else {
            setCpuClickCoordinates(battleship.useCoordinate())
        }
    }

    // draw game boards
    let playerBoard = [];
    let cpuBoard = [];
    if (playerShipCoordinates && cpuShipCoordinates) {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                playerBoard.push(
                    <Square 
                        key={`player-${x}-${y}-game${gameCount}`} 
                        isShipLocation={playerShipCoordinates.some(coordinate => coordinate.x === x && coordinate.y === y)}
                        isPlayerBoard={true}
                        turn={turn}
                        handleClick={handleCPUClick}
                        baseColor={playerShipCoordinates.some(coordinate => coordinate.x === x && coordinate.y === y) ? 'blue' : 'white'}
                        isGameOver={gameOver}
                        isCpuTarget={cpuClickCoordinates?.x === x && cpuClickCoordinates?.y === y ? true : false}
                    />
                )

                cpuBoard.push(
                    <Square 
                        key={`cpu-${x}-${y}-game${gameCount}`}
                        isShipLocation={cpuShipCoordinates.some(coordinate => coordinate.x === x && coordinate.y === y)}
                        isPlayerBoard={false}
                        turn={turn}
                        handleClick={handlePlayerClick}
                        baseColor={'white'}
                        isGameOver={gameOver}
                        isCpuTarget={false}
                    />
                )
            }
        }
    }

    // render game
    return (
        <div className='bs-container'>
            <div className='bs-newGame' onClick={newGame}>New Game</div>
            <div className='bs-boards'>
                <div>
                    <div className='title mt-5 bs-title'>Your Ships</div>
                    <div className={turn === 'cpu' ? 'bs-board selected' : 'bs-board'}>
                        {playerBoard}
                    </div>
                </div>
                <div>
                    <div className='title mt-5 bs-title'>CPU Ships</div>
                    <div className={turn !== 'cpu' ? 'bs-board selected' : 'bs-board'}>
                        {cpuBoard}
                    </div>
                </div>
            </div>         
        </div>
    )
}

export default Battleship