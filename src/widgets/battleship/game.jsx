import React, {useState, useEffect} from 'react';
import Square from './components/square.jsx'
import './battleship.scss';
import getShipCoordinates from './components/ships.js';

const Battleship = () => {
    const [playerBoard, setPlayerBoard] = useState(null)
    const [cpuBoard, setCPUBoard] = useState(null)

    const newGame = () => {
        const playerCoordinates = getShipCoordinates()
        const playerSquares = []
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                playerSquares.push(
                    <Square 
                        key={`player-${x}-${y}-${Math.random()}`} 
                        x={x} 
                        y={y} 
                        isShipLocation={playerCoordinates.some(coordinate => coordinate.x === x && coordinate.y === y)}
                        isPlayer={true}
                    />
                )
            }
        }
        setPlayerBoard(playerSquares)

        const cpuCoordinates = getShipCoordinates()
        const cpuSquares = []
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                cpuSquares.push(
                    <Square 
                        key={`cpu-${x}-${y}-${Math.random()}`} 
                        x={x} 
                        y={y} 
                        isShipLocation={cpuCoordinates.some(coordinate => coordinate.x === x && coordinate.y === y)}
                        isPlayer={false}
                    />
                )
            }
        }
        setCPUBoard(cpuSquares)
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