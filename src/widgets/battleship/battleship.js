class Battleship {
    #availableCoordinates; 
    #lastTarget; 
    #searchDirection = 'up';
    #isFixedDirection = false;
    #recentHits = [];

    constructor() { 
        this.resetAvailableCoordinates()
    }

    resetAvailableCoordinates() { 
        this.#availableCoordinates = this.getAllCoordinates()
    }

    getRandomizedShipCoordinates() {
        const directions = ['horizontal', 'vertical']
        const shipSizes = [5, 4, 3, 3, 2]
        const shipCoordinates = []
    
        shipSizes.forEach(shipSize => {
            let validCoordinates = false;
            while (!validCoordinates) {
                const direction = directions[Math.floor(Math.random()*2)]
                const randomX = Math.floor(Math.random() * 10)
                const randomY = Math.floor(Math.random() * 10)
                const newCoordinates = []
    
                if (direction === 'horizontal') {
                    if (randomX - shipSize < 0) {
                        for (let x = randomX; x < shipSize + randomX; x++) {
                            newCoordinates.push({x: x, y: randomY})
                        }
                    } else {
                        for (let x = randomX; x > randomX - shipSize; x--) {
                            newCoordinates.push({x: x, y: randomY})
                        }
                    }
                } else {
                    if (randomY - shipSize < 0) {
                        for (let y = randomY; y < shipSize + randomY; y++) {
                            newCoordinates.push({x: randomX, y: y})
                        }
                    } else {
                        for (let y = randomY; y > randomY - shipSize; y--) {
                            newCoordinates.push({x: randomX, y: y})
                        }
                    }
                }
    
                const duplicateCoordinates = [...newCoordinates].filter(newCoordinate => {
                    return [...shipCoordinates].some(shipCoordinate => newCoordinate.x === shipCoordinate.x && newCoordinate.y === shipCoordinate.y)
                })
                
                if (duplicateCoordinates.length === 0) {
                    validCoordinates = true;
                    shipCoordinates.push(...newCoordinates)
                }
            }
        })
    
        return shipCoordinates
    }

    getAllCoordinates() {
        const coordinates = []
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                coordinates.push({x: x, y: y})
            }
        }
        return coordinates
    }

    useCoordinate() {
        if (this.#recentHits.length > 0) {
            this.#lastTarget = this.#calculateNextTarget()
            return this.#lastTarget
        } else {
            this.#lastTarget = this.#useRandomAvailableCoordinate()
            return this.#lastTarget
        }
    }

    reportSuccessfulHit() {
        if (!this.#isFixedDirection) {
            this.#recentHits.push(this.#lastTarget)
        } else {
            this.#recentHits.unshift(this.#lastTarget)
        }
    }

    reportMissedHit() {
        if (this.#recentHits.length === 1) {
            this.#nextDirection()
        } else if (this.#recentHits.length > 1) {
            if (!this.#isFixedDirection) {
                this.#invertDirection()
                this.#isFixedDirection = true
            } else {
                this.#recentHits = []
                this.#isFixedDirection = false
                this.#searchDirection = 'up'
            }
        }
    }

    #useRandomAvailableCoordinate() {
        const randomIndex = Math.floor(Math.random() * this.#availableCoordinates.length)
        return this.#availableCoordinates.splice(randomIndex, 1)[0]
    }

    #calculateNextTarget() {
        debugger
        const newTarget = this.#isFixedDirection ? {...this.#recentHits[0]} : {...this.#recentHits[this.#recentHits.length - 1]}
        if (this.#searchDirection === 'up') {
            newTarget.y = newTarget.y - 1
            if (!this.#isAvailableTarget(newTarget)) {
                this.#nextDirection()
                return this.#calculateNextTarget()
            } else {
                const calculatedIndex = this.#availableCoordinates.findIndex(coordinate => {
                    return coordinate.x === newTarget.x && coordinate.y === newTarget.y
                })
                return this.#availableCoordinates.splice(calculatedIndex, 1)[0]
            }
        } else if (this.#searchDirection === 'left') {
            newTarget.x = newTarget.x - 1
            if (!this.#isAvailableTarget(newTarget)) {
                this.#nextDirection()
                return this.#calculateNextTarget()
            } else {
                const calculatedIndex = this.#availableCoordinates.findIndex(coordinate => {
                    return coordinate.x === newTarget.x && coordinate.y === newTarget.y
                })
                return this.#availableCoordinates.splice(calculatedIndex, 1)[0]
            }
        } else if (this.#searchDirection === 'down') {
            newTarget.y = newTarget.y + 1
            if (!this.#isAvailableTarget(newTarget)) {
                this.#nextDirection()
                return this.#calculateNextTarget()
            } else {
                const calculatedIndex = this.#availableCoordinates.findIndex(coordinate => {
                    return coordinate.x === newTarget.x && coordinate.y === newTarget.y
                })
                return this.#availableCoordinates.splice(calculatedIndex, 1)[0]
            }
        } else if (this.#searchDirection === 'right') {
            newTarget.x = newTarget.x + 1
            if (!this.#isAvailableTarget(newTarget)) {
                this.#recentHits = [];
                this.#searchDirection = 'up';
                return this.#useRandomAvailableCoordinate()
            } else {
                const calculatedIndex = this.#availableCoordinates.findIndex(coordinate => {
                    return coordinate.x === newTarget.x && coordinate.y === newTarget.y
                })
                return this.#availableCoordinates.splice(calculatedIndex, 1)[0]
            }
        }
    }

    #nextDirection() {
        if (this.#isFixedDirection) {
            this.#recentHits = []
            this.#isFixedDirection = false
        }
        switch(this.#searchDirection) {
            case 'up':
                this.#searchDirection = 'left';
                break;
            case 'left':
                this.#searchDirection = 'down';
                break;
            case 'down':
                this.#searchDirection = 'right';
                break;
        }
    }

    #invertDirection() {
        switch(this.#searchDirection) {
            case 'up':
                this.#searchDirection = 'down';
                break;
            case 'down':
                this.#searchDirection = 'up';
                break;
            case 'left':
                this.#searchDirection = 'right';
                break;
            case 'right':
                this.#searchDirection = 'left';
                break;
        }
    }

    #isAvailableTarget(target) {
        return this.#availableCoordinates.some(coordinate => coordinate.x === target.x && coordinate.y === target.y)
    }
}

const battleship = new Battleship();
export default battleship;