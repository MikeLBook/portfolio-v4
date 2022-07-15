Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

export default function getShipCoordinates() {
    const directions = ['horizontal', 'vertical']
    const shipSizes = [5, 4, 3, 3, 2]
    const shipCoordinates = []

    shipSizes.forEach(shipSize => {
        let validCoordinates = false;
        while (!validCoordinates) {
            const direction = directions.random()
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