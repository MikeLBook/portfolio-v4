import React, {useState, useEffect} from 'react';

const Square = ({
    isShipLocation, isPlayerBoard, turn, handleBoardClick, baseColor, isGameOver
}) => {
    const [clicked, setClicked] = useState(false)

    const clickSquare = () => {
        // only trigger if the square has not been clicked yet, the game is not over,
        // and the square belongs to the board of the opponent of whose turn it is
        if (!clicked && ((turn === 'player') ? !isPlayerBoard : isPlayerBoard) && !isGameOver) {
            setClicked(true)
            handleBoardClick(isShipLocation)
        }
    }

    let backgroundColor = baseColor;
    if (clicked && isShipLocation) {
        backgroundColor = 'red'
    }

    return(
        <div 
            onClick={clickSquare}
            className='bs-square' 
            style={{backgroundColor: backgroundColor}}
        > {clicked && 'x'}
        </div>
    )
}

export default Square