import React from 'react';
import './battleship.scss';

function Ship(coordinateArray) {
    const length = coordinateArray.length;
    const hitLocations = [];

    const hit = (x, y) => {
        let alreadyHit = false;
        hitLocations.forEach(location => {
            if (location[0] === x && location[1] === y) {
                alreadyHit = true;
            }
        })
        if (!alreadyHit) {
            hitLocations.push([x, y]);
            return true;
        }
        return false;
    }

    const isSunk = () => {
        return hitLocations.length === length ? true : false
    }

    return {hit, isSunk}
}

function GameBoard(ships) {

    const createShips = () => {
        const carrier = Ship(ships['carrier']);
        const battleship = Ship(ships['battleship']);
        const destroyer = Ship(ships['destroyer']);
        const submarine = Ship(ships['submarine']);
        const patrol = Ship(ships['patrol']);
        return {carrier, battleship, destroyer, submarine, patrol}
    }

    const {carrier, battleship, destroyer, submarine, patrol} = createShips();
    
    const receiveAttack = target => {
        const [x, y] = target;
        let targetShip = null;
        let successfulHit;
        for (const [key, value] of Object.entries(ships)) {
            value.forEach(coordinateArray => {
                if (coordinateArray.toString() === target.toString()) {
                    switch (key) {
                        case 'carrier':
                            targetShip = carrier;
                            break;
                        case 'battleship':
                            targetShip = battleship;
                            break;
                        case 'destroyer':
                            targetShip = destroyer;
                            break;
                        case 'submarine':
                            targetShip = submarine;
                            break;
                        case 'patrol':
                            targetShip = patrol;
                            break;
                    }
                }
            })
        }
        if (targetShip !== null) {
            successfulHit = targetShip.hit(x, y);
        }
        return successfulHit
    }

    const allSunk = () => {
        if (carrier.isSunk() && battleship.isSunk() && destroyer.isSunk() && submarine.isSunk() && patrol.isSunk()) {
            return true
        } else {
            return false
        }
    }

    return {receiveAttack, allSunk}
}

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color : this.props.playerCoordinate(this.props.x, this.props.y) && this.props.thisPlayer === 1 ? 'blue' : 'white',
            value : '',
            highlight: false
        }
    }

    sendHit = () => {
        if (this.props.thisPlayer === this.props.currentPlayer() && this.state.value !== 'x') {
            this.setState({
                value : 'x'
            })
            const successfulHit = this.props.click([this.props.x, this.props.y]);
            if (successfulHit === true) {
                this.setState({
                    color: 'red',
                })
                this.props.checkForWin();
            } else {
                this.props.switchPlayer();
            }
        }
    }

    render() {
        return (
            <div 
                className='bs-square' 
                onClick={() => this.sendHit()} 
                style={{
                    backgroundColor: this.state.color,
                    border: this.state.highlight ? '2px solid green' : ''
                }}
            >
            {this.state.value}</div>
        )   
    }
}

class Battleship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.cpuTurnLoop = this.cpuTurnLoop.bind(this);
    }

    newGame = () => {
        const playerBoard = this.getRandomCoordinates();
        const newBoard1 = GameBoard(playerBoard);
        const newBoard2 = GameBoard(this.getRandomCoordinates());
        this.setState({
            board1 : newBoard1,
            board2 : newBoard2,
            player : 2,
            cpuTargetHistory : [-1],
            nextTarget : -1,
            playerBoard : playerBoard,
        })
        this.drawBoard(newBoard1, 1);
        this.drawBoard(newBoard2, 2);        
    }

    getRandomCoordinates = () => {
        const ships = {};
        const allCoordinates = [];
        let boatCoordinates = Math.random() >= 0.5 ? this.fillHorizontal(5) : this.fillVertical(5);
        boatCoordinates.forEach(coordinate => {
            allCoordinates.push(coordinate);
        })
        ships['carrier'] = boatCoordinates;
        let duplicates = true;
        while (duplicates !== false) {
            boatCoordinates = Math.random() >= 0.5 ? this.fillHorizontal(4) : this.fillVertical(4);
            duplicates = this.duplicatesExist(boatCoordinates, allCoordinates);
        }
        boatCoordinates.forEach(coordinate => {
            allCoordinates.push(coordinate);
        })
        ships['battleship'] = boatCoordinates;
        duplicates = true;
        while (duplicates !== false) {
            boatCoordinates = Math.random() >= 0.5 ? this.fillHorizontal(3) : this.fillVertical(3);
            duplicates = this.duplicatesExist(boatCoordinates, allCoordinates);
        }
        boatCoordinates.forEach(coordinate => {
            allCoordinates.push(coordinate);
        })
        ships['destroyer'] = boatCoordinates;
        duplicates = true;
        while (duplicates !== false) {
            boatCoordinates = Math.random() >= 0.5 ? this.fillHorizontal(3) : this.fillVertical(3);
            duplicates = this.duplicatesExist(boatCoordinates, allCoordinates);
        }
        boatCoordinates.forEach(coordinate => {
            allCoordinates.push(coordinate);
        })
        ships['submarine'] = boatCoordinates;
        duplicates = true;
        while (duplicates !== false) {
            boatCoordinates = Math.random() >= 0.5 ? this.fillHorizontal(2) : this.fillVertical(2);
            duplicates = this.duplicatesExist(boatCoordinates, allCoordinates);
        }
        ships['patrol'] = boatCoordinates;
        
        return ships;
    }

    duplicatesExist = (current, previous) => {
        let duplicates = false;
        current.forEach(newCoordinate => {
            previous.forEach(oldCoordinate => {
                if (JSON.stringify(newCoordinate) === JSON.stringify(oldCoordinate)) {
                    duplicates = true;
                }
            })
        })
        return duplicates;
    }

    fillHorizontal = (qty) => {
        const startingCoordinate = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        const shipCoordinates = [startingCoordinate];
        if (startingCoordinate[0] + qty > 9) {
            for (let x = 1; x < qty; x++) {
                shipCoordinates.push([startingCoordinate[0] - x, startingCoordinate[1]])
            } 
        } else {
            for (let x = 1; x < qty; x++) {
                shipCoordinates.push([startingCoordinate[0] + x, startingCoordinate[1]])
            }
        }
        return shipCoordinates;
    }

    fillVertical = (qty) => {
        const startingCoordinate = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        const shipCoordinates = [startingCoordinate];
        if (startingCoordinate[1] + qty > 9) {
            for (let y = 1; y < qty; y++) {
                shipCoordinates.push([startingCoordinate[0], startingCoordinate[1] - y]);
            }
        } else {
            for (let y = 1; y < qty; y++) {
                shipCoordinates.push([startingCoordinate[0], startingCoordinate[1] + y]);
            }
        }
        return shipCoordinates;
    }

    drawBoard = (board, player) => {
        let squares = [];
        for (let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                squares.push(<Square key={Math.random()} click={board.receiveAttack}
                x={row} y={column} currentPlayer={this.getCurrentPlayer} 
                thisPlayer={player} switchPlayer={this.switchPlayer}
                checkForWin={this.checkForWin} ref={React.createRef()}
                playerCoordinate={this.checkPlayerCoordinate} />)
            }
        }
        if (player === 1) {
            this.setState({
                p1BoardRender : squares,
            })
        }   else if (player === 2) {
            this.setState({
                p2BoardRender : squares,
            })
        }
    }

    checkPlayerCoordinate = (x, y) => {
        let playerCoordinate = false;
        const playerBoard = this.state.playerBoard;
        for (const [key, values] of Object.entries(playerBoard)) {
            values.forEach(value => {
                if (value[0] === x && value[1] === y) {
                    playerCoordinate = true;
                }
            }) 
        }
        return playerCoordinate;
    }

    getCurrentPlayer = () => {
        return this.state.player;
    }

    switchPlayer = () => {
        const player = this.state.player;
        player === 1 ? this.setState({player: 2}) : this.setState({player: 1});
        this.cpuTurnLoop();
    }

    checkForWin = () => {
        let winner = false;
        if (this.state.board1.allSunk() === true) {
            window.alert('Player 2 Wins!');
            winner = true;
            this.setState({
                player : -1,
            })
        }
        if (this.state.board2.allSunk() === true) {
            window.alert('Player 1 Wins!');
            winner = true;
            this.setState({
                player : -1,
            })
        }
        return winner;
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async cpuTurnLoop() {
        let cpuTurn = true;
        while (cpuTurn === true) {
            while (this.state.cpuTargetHistory.indexOf(this.state.nextTarget) !== -1) {
                await this.sleep(1000);
                this.calculateNextTarget();
            }
            const index = this.state.nextTarget;
            const component = this.state.p1BoardRender[index].ref.current;
            let successfulHit = this.state.board1.receiveAttack([component.props.x, component.props.y]);
            if (successfulHit === true) {
                component.setState({
                    color : 'red',
                    value : 'x'
                })
            } else {
                successfulHit = false;
                component.setState({
                    value : 'x'
                })
                cpuTurn = false;
            }
            this.state.cpuTargetHistory.unshift(index);
            this.state.cpuTargetHistory.push(successfulHit);
        }
        if (this.checkForWin() !== true) {
            this.setState({
                player : 2
            })
        }
    }

    calculateNextTarget = () => {
        if (this.state.cpuTargetHistory[this.state.cpuTargetHistory.length - 1] === true) {
            this.checkRight(this.state.cpuTargetHistory[0]); 
        } else if (this.state.cpuTargetHistory[this.state.cpuTargetHistory.length - 2] === true) {
            this.checkLeft(this.state.cpuTargetHistory[1]);
        } else if (this.state.cpuTargetHistory[this.state.cpuTargetHistory.length - 3] === true) {
            this.checkUp(this.state.cpuTargetHistory[2]);
        } else if (this.state.cpuTargetHistory[this.state.cpuTargetHistory.length - 4] === true) {
            this.checkDown(this.state.cpuTargetHistory[3]);
        } else {
            this.setState({
                nextTarget : Math.floor(Math.random() * 100),
            }) 
        }
    }

    checkRight = (index) => {
        if (index + 1 < 100 && index + 1 >= 0) {
            if (this.state.p1BoardRender[index + 1].ref.current.state.value !== 'x') {
                this.setState({
                    nextTarget : index + 1,
                }) 
            } else {
                this.checkLeft(index)
            }
        } else {
            this.checkLeft(index)
        }
    }

    checkLeft = (index) => {
        if (index - 1 < 100 && index - 1 >= 0) {
            if (this.state.p1BoardRender[index - 1].ref.current.state.value !== 'x') {
                this.setState({
                    nextTarget : index - 1,
                }) 
            } else {
                this.checkUp(index) 
            }
        } else {
            this.checkUp(index) 
        }
    }

    checkUp = (index) => {
        if (index - 10 < 100 && index - 10 >= 0) {
            if (this.state.p1BoardRender[index - 10].ref.current.state.value !== 'x') {
                this.setState({
                    nextTarget : index - 10,
                }) 
            } else {
                this.checkDown(index)
            } 
        } else {
            this.checkDown(index)
        }
    }

    checkDown = (index) => {
        if (index + 10 < 100 && index + 10 >= 0) {
            if (this.state.p1BoardRender[index + 10].ref.current.state.value !== 'x') {
                this.setState({
                    nextTarget : index + 10,
                }) 
            } else {
                this.setState({
                    nextTarget : Math.floor(Math.random() * 100),
                }) 
            }
        } else {
            this.setState({
                nextTarget : Math.floor(Math.random() * 100),
            }) 
        }
    }

    render() {
        return (
            <div className='bs-container'>
                <div className='bs-newGame' onClick={this.newGame}>New Game</div>
                <div className='bs-boards'>
                    <div>
                        <div className='title mt-5 bs-title'>Your Ships</div>
                        <div className='bs-board'>
                            {this.state.p1BoardRender}
                        </div>
                    </div>
                    <div>
                        <div className='title mt-5 bs-title'>CPU Ships</div>
                        <div className='bs-board'>
                            {this.state.p2BoardRender}
                        </div>
                    </div>
                </div>         
            </div>
        )
    }
}

export default Battleship;