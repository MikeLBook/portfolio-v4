import React from 'react';
import './tictactoe.scss';

class TicTacToe extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            player1 : 'player1',
            player2 : 'player2',
            board : Array(9).fill(null),
            playerOnesTurn : true,
            winner : false,
        };
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
        });
    }

    handleClick = (index) => {
        if (this.state.board[index] === null && ! this.state.winner) {
            let newBoard = this.state.board;
            this.state.playerOnesTurn ? newBoard[index] = 'X' : newBoard[index] = 'O';
            this.setState({
                board : newBoard,
                playerOnesTurn : !this.state.playerOnesTurn,
            });
            this.checkForWinner();
        }
    }

    newGame = () => {
        this.setState({
            board : Array(9).fill(null),
            playerOnesTurn : true,
            winner : false,
        });
    }

    checkForWinner = () => {
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
            if (this.state.board[row[0]] != null && this.state.board[row[0]] === this.state.board[row[1]] && this.state.board[row[0]] === this.state.board[row[2]]) {
                this.setState({
                    winner : true,
                });
                window.alert('Winner!');
            }
        })
    }

    render() {
        return (
            <div className='ttt-container'>
                <fieldset>
                    <legend>Controls</legend>
                    <form>
                        <div>
                            <label>
                                P1 Username: 
                                <input type="text" name='player1' className="ttt-controls" value={this.state.player1} onChange={this.handleChange}
                                autoComplete="off" />
                            </label>
                        </div>
                        <div>
                            <label>
                                P2 Username: 
                                <input type="text" name='player2' className='ttt-controls' value={this.state.player2} onChange={this.handleChange}
                                autoComplete="off" />
                            </label>
                        </div>
                        <div className='ttt-new' onClick={() => this.newGame()}>New Game!</div>
                    </form>
                </fieldset>
                <div className='console'>
                    {this.state.winner ? 'Game Over' : <p>{this.state.playerOnesTurn ? `${this.state.player1}, it is your turn!` : `${this.state.player2}, it is your turn!`}</p>}
                </div>
                <div className='board'>
                    <div className='square' onClick={() => this.handleClick(0)}>{this.state.board[0]}</div>
                    <div className='square' onClick={() => this.handleClick(1)}>{this.state.board[1]}</div>
                    <div className='square' onClick={() => this.handleClick(2)}>{this.state.board[2]}</div>
                    <div className='square' onClick={() => this.handleClick(3)}>{this.state.board[3]}</div>
                    <div className='square' onClick={() => this.handleClick(4)}>{this.state.board[4]}</div>
                    <div className='square' onClick={() => this.handleClick(5)}>{this.state.board[5]}</div>
                    <div className='square' onClick={() => this.handleClick(6)}>{this.state.board[6]}</div>
                    <div className='square' onClick={() => this.handleClick(7)}>{this.state.board[7]}</div>
                    <div className='square' onClick={() => this.handleClick(8)}>{this.state.board[8]}</div>
                </div>
            </div>    
        )
    }
}

export default TicTacToe