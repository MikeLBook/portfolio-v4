import React, {useState, useEffect} from 'react';

const Square = (props) => {
    const [color, setColor] = useState(props.isShipLocation && props.isPlayer ? 'blue' : 'white')
    const [clicked, setClicked] = useState(false)

    const clickSquare = () => {
        if (!clicked) {
            setClicked(true)
            if (props.isShipLocation) {
                setColor('red')
            }
        }
    }

    return(
        <div 
            onClick={clickSquare}
            className='bs-square' 
            style={{backgroundColor: color}}
        > {clicked && 'x'}
        </div>
    )
}

export default Square