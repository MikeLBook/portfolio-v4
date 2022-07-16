import React, {useState} from 'react';
import Battleship from '../../widgets/battleship/battleship.jsx';
import TicTacToe from '../../widgets/tictactoe/tictactoe.jsx';
import Calculator from '../../widgets/calculator/calculator.jsx';
import tttImage from '../../assets/tictactoe.png';
import calcImage from '../../assets/calculator.png';
import bsImage from '../../assets/battleship.png';
import useSound from 'use-sound';
import clickSfx from '../../assets/clickSfx.mp3';
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
    const [playSound] = useSound(clickSfx);

    const chooseModule = (moduleName) => {
        playSound();
        setRender(moduleName)
    }

    const goBack = () => {
        playSound();
        setRender('menu')
    }


    let display;
    if (render === 'menu') {
        display = modules.map((module, index) => {
            return (<div key={`widget ${index}`} className='widget'><img src={module.image} alt={module.name} width="250px" height="250px" onClick={() => chooseModule(module.name)}/></div>)
        })
    } else if (render === 'BattleShip') {
        display = <Battleship playSound={playSound} />
    } else if (render === 'Calculator') {
        display = <Calculator playSound={playSound} />
    } else if (render === 'Tic Tac Toe') {
        display = <TicTacToe playSound={playSound} />
    } 

    return(
        <div className='widgets-container'>
            {render !== 'menu' && <button onClick={goBack} className='back'>Back</button>}
            {display}
        </div>
    )
}

export default Widgets;