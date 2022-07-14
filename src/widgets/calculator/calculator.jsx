import React from 'react';
import './calculator.scss';

function Button(props) {
    return(
        <div 
        className={props.type}
        onMouseDown={(e) => e.target.style.transform = "scale(.95)"}
        onMouseUp={(e) => e.target.style.transform = "scale(1)"}
        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        onClick={() => props.click(props.value)}
        value={props.value}
        >{props.value}</div>
    )
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTotal : '',
            currentInput : '',
        }
    }

    handleBackspace = () => {
        const input = this.state.currentInput.slice(0, -1)
        if (input === '-') {
            this.setState({
                currentInput : ''
            })
        } else {
            this.setState({
                currentInput : input,
            })
        }
    }

    handleNumberPress = (value) => {
        const input = this.state.currentInput + value;
        this.setState({
            currentInput : input,
        });
    }

    handleOperator = (value) => {
        if (this.state.currentInput !== '') {
            let input;
            if (this.state.currentInput[0] === '-') {
                input = '(' + this.state.currentInput + ')' + value
            } else {
                input = this.state.currentInput + value;
            }
            const output = this.state.currentTotal + input;
            this.setState({
                currentTotal : output,
                currentInput : ''
            });
        }
    }

    handleClear = () => {
        this.setState({
            currentInput : '',
            currentTotal : '',
        })
    }

    changeNegative = () => {
        if (this.state.currentInput !== '') {
            if (this.state.currentInput[0] === '-') {
                const input = this.state.currentInput.substr(1)
                this.setState({
                    currentInput : input,
                })
            } else {
                const input = '-' + this.state.currentInput
                this.setState({
                    currentInput : input,
                })
            }
        }
    }

    handleDecimal = () => {
        let input = this.state.currentInput
        if (input.indexOf('.') === -1) {
            input = this.state.currentInput + '.'
            this.setState({
                currentInput : input,
            })
        }
    }

    evaluate = () => {
        if (this.state.currentTotal !== '') {
            let input;
            if (this.state.currentInput[0] === '-') {
                input = '(' + this.state.currentInput + ')'
            } else {
                input = this.state.currentInput;
            }
            let statement = this.state.currentTotal + input;
            if (isNaN(statement[statement.length - 1])) {
                statement = statement.slice(0, -1);
            }
            let numbers = []
            let operators = []
            let numberString = '';
            for (let i = 0; i < statement.length; i++) {
                if (!isNaN(statement[i]) || statement[i] === '.') {
                    numberString = numberString + statement[i];
                } else if (statement[i] === '(' || statement[i] === ')') {
                    continue;
                } else if (statement[i] === '-' && statement[i-1] === '(') {
                    numberString = numberString + statement[i];
                } else {
                    operators.push(statement[i]);
                    numbers.push(numberString);
                    numberString = '';
                }
            }
            numbers.push(numberString);
            let total = Number(numbers.shift());
            operators.forEach((operator) => {
                switch (operator) {
                case "*":
                    total = total * Number(numbers.shift());
                    break;
                case "\\":
                    total = total / Number(numbers.shift());
                    break;
                case "+":
                    total += Number(numbers.shift());
                    break;
                case "-":
                    total -= Number(numbers.shift());
                    break;
                default:
                    console.log("This shouldn't be happening");
                }
            });
            this.setState({
                currentInput : total.toString(),
                currentTotal : ''
            })
        }
    }

    handleKeyUp = (event) => {
        console.log(event);
    }

    componentDidMount = () => {
        document.addEventListener('keyup', (e) => {
            if (e.key === "Backspace"){
              this.handleBackspace();
            } else if (e.key === "Delete" || e.key === "c"){
              this.handleClear();
            } else if (e.key === "Enter"){
              this.evaluate();
            } else if (!isNaN(e.key)) {
                this.handleNumberPress(e.key);
            } else if (e.key === '.') {
                this.handleDecimal();
            } else if (e.key === '*' || e.key === '+' || e.key === '-' || e.key === '\\') {
                this.handleOperator(e.key);
            } else {
                console.log(e.key);
            }
        });
    }

    render() {
        return (
            <div className='my-content calculator'>
                <div className='screen'>
                    <div className='current-total'>{this.state.currentTotal}</div>
                    <div className='current-input'>{this.state.currentInput}</div>
                </div>
                <Button type='calc-button' value={`<`} click={this.handleBackspace} />
                <Button type='calc-button' value='+/-' click={this.changeNegative} />
                <Button type='calc-button' value='C' click={this.handleClear} />
                <Button type='calc-button' value={`\\`} click={this.handleOperator} />
                <Button type='calc-button' value='7' click={this.handleNumberPress} />
                <Button type='calc-button' value='8' click={this.handleNumberPress} />
                <Button type='calc-button' value='9' click={this.handleNumberPress} />
                <Button type='calc-button' value='*' click={this.handleOperator} />
                <Button type='calc-button' value='4' click={this.handleNumberPress} />
                <Button type='calc-button' value='5' click={this.handleNumberPress} />
                <Button type='calc-button' value='6' click={this.handleNumberPress} />
                <Button type='calc-button' value='-' click={this.handleOperator} />
                <Button type='calc-button' value='1' click={this.handleNumberPress} />
                <Button type='calc-button' value='2' click={this.handleNumberPress} />
                <Button type='calc-button' value='3' click={this.handleNumberPress} />
                <Button type='calc-button' value='+' click={this.handleOperator} />
                <Button type='zero-button' value='0' click={this.handleNumberPress} />
                <Button type='calc-button' value='.' click={this.handleDecimal} />
                <Button type='calc-button' value='=' click={this.evaluate} />
            </div>
        )
    }
}

export default Calculator