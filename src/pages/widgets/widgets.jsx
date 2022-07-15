import React, {useState} from 'react';
import Battleship from '../../widgets/battleship/game';
import TicTacToe from '../../widgets/tictactoe/tictactoe';
import Calculator from '../../widgets/calculator/calculator';
import tttImage from '../../assets/tictactoe.png';
import calcImage from '../../assets/calculator.png';
import bsImage from '../../assets/battleship.png';
import './widgets.scss';


const modules = [
    {
        'image': tttImage,
        'name': 'Tic Tac Toe'
    },
    {
        'image': calcImage,
        'name': 'Calculator'
    },
    {
        'image': bsImage,
        'name': 'BattleShip'
    }
]

const Widgets = () => {
    const [render, setRender] = useState('menu');

    let display;
    if (render === 'menu') {
        display = modules.map((module, index) => {
            return (<div key={`widget ${index}`} className='widget'><img src={module.image} alt={module.name} width="250px" height="250px" onClick={() => setRender(module.name)}/></div>)
        })
    } else if (render === 'BattleShip') {
        display = <Battleship />
    } else if (render === 'Calculator') {
        display = <Calculator />
    } else if (render === 'Tic Tac Toe') {
        display = <TicTacToe />
    } 

    return(
        <div className='widgets-container'>
            {render !== 'menu' && <button onClick={() => setRender('menu')} className='back'>Back</button>}
            {display}
        </div>
    )
}

export default Widgets;