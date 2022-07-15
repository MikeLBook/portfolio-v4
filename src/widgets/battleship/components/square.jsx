import React, {useState, useEffect} from 'react';

const Square = ({
    isShipLocation, isPlayerBoard, turn, handleClick, baseColor, isGameOver, isCpuTarget
}) => {
    const [hasBeenClicked, setHasBeenClicked] = useState(false)

    // Fires if the square becomes the cpuTarget
    useEffect(() => {
        if (isCpuTarget) {
            if (!hasBeenClicked) {
                setHasBeenClicked(true)
                handleClick(true, isShipLocation)
            } else {
                handleClick(false, isShipLocation)
            }
        }
    }, [isCpuTarget])

    // Fires when the user clicks a given square
    const clickSquare = () => {
        if (!hasBeenClicked && !isPlayerBoard && !isGameOver && turn === 'player') {
            setHasBeenClicked(true)
            handleClick(isShipLocation)
        }
    }

    // render logic
    let backgroundColor = baseColor;
    if (hasBeenClicked && isShipLocation) {
        backgroundColor = 'red'
    }

    // draw square
    return(
        <div 
            onClick={clickSquare}
            className='bs-square' 
            style={{backgroundColor: backgroundColor}}
        > {hasBeenClicked && 'x'}
        </div>
    )
}

export default Square