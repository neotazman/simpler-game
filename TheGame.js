

let theBoard = document.createElement('table')
let HUD = document.createElement('p')
HUD.id = 'HUD'
//let refresh = document.getElementById('refresh') //isn't working with the enemy AI

//you get power ups over time
let totalPowerUps = 0
let buildPowerUps = () => {
    totalPowerUps++
}

let HUDDisplay = (container) => {//Updates the HUD
    HUD.innerText = 'Game State Details: '
    if(totalPowerUps === 1) {
        HUD.innerText += 'You Have 1 Power Up'
    } else {
        HUD.innerText += `You Have ${totalPowerUps} Power Ups`
    }
    HUD.innerText += ` Difficulty ${difficultyLevel} Your Score is ${secondsElapsed}`
    container.append(HUD)
}

//the timer is the score
let secondsElapsed = 0
let timeElapsed = () => {
    secondsElapsed++
}

const gameBoard = [ // where the game state is stored
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const cellValue = (cell) => { //reads the 1 as the player and 2 as the enemy
    if(cell === 0) return 'empty'
    else if(cell === 1) return 'player'
    else if(cell === 2) return 'enemy'
    else if(cell === 3) return 'decoy'
}

const findPlayer = () => { //finds the player's position. also checks if the player loses
    for(let row = 0; row < gameBoard.length; row++) {
        for(let cell = 0; cell < gameBoard[row].length; cell++) {
            if(cellValue(gameBoard[row][cell]) === 'player') {
                return {row, cell}
            }
        }
    }
    document.write(`GAME OVER! You scored ${secondsElapsed}`)
    clearInterval(enemyAI)
    clearInterval(score)
    clearInterval(difficulty)
    clearInterval(powerUpBuilders)
    //clearInterval(HUDRefresh)
    secondsElapsed = 0
}

const findEnemy = () => { //finds the enemy's position
    for(let enemyRow = 0; enemyRow < gameBoard.length; enemyRow++) {
        for(let enemyCell = 0; enemyCell < gameBoard[enemyRow].length; enemyCell++) {
            if(cellValue(gameBoard[enemyRow][enemyCell]) === 'enemy') {
                return {enemyRow, enemyCell}
            }
        }
    }
    return false
}

const findDecoy = () => { //finds the decoy block's position
    for(let decoyRow = 0; decoyRow < gameBoard.length; decoyRow++) {
        for(let decoyCell = 0; decoyCell < gameBoard[decoyRow].length; decoyCell++) {
            if(cellValue(gameBoard[decoyRow][decoyCell]) === 'decoy') {
                return {decoyRow, decoyCell}
            }
        }
    }
    return false
}

//the movement functions
const moveRight = () => {
    const{ row, cell } = findPlayer()
    if(cell === gameBoard[row].length -1) {
        gameBoard[row][0] = 1
        gameBoard[row][cell] = 0
        return
    }
    gameBoard[row][cell + 1] = 1
    gameBoard[row][cell] = 0
}
const moveLeft = () => {
    const{ row, cell } = findPlayer()
    if(cell === 0) {
        gameBoard[row][gameBoard[row].length - 1] = 1
        gameBoard[row][cell] = 0
        return
    }
    gameBoard[row][cell - 1] = 1
    gameBoard[row][cell] = 0
}
const moveUp = () => {
    const{ row, cell } = findPlayer()
    if(row === 0) {
        gameBoard[gameBoard.length - 1][cell] = 1
        gameBoard[row][cell] = 0
        return
    }
    gameBoard[row - 1][cell] = 1
    gameBoard[row][cell] = 0
}
const moveDown = () => {
    const{ row, cell } = findPlayer()
    if(row === gameBoard.length - 1) {
        gameBoard[0][cell] = 1
        gameBoard[row][cell] = 0
        return
    }
    gameBoard[row + 1][cell] = 1
    gameBoard[row][cell] = 0
}

const movement = (e) => { //the player's movement
    e.preventDefault()
    if(e.keyCode === 39 || e.keyCode === 68) {
        moveRight()
    } else if(e.keyCode === 37 || e.keyCode === 65) {
        moveLeft()
    } else if(e.keyCode === 38 || e.keyCode === 87) {
        moveUp()
    } else if(e.keyCode === 40 || e.keyCode === 83) {
        moveDown()
    } else if(e.keyCode === 32) { //the spacebar places a decoy
        powerUp()
    }
    buildGameBoard()
}


const enemyMove = () => { //checks the player's position and the enemy's position and moves the enemy towards the player
    if(!findEnemy()) { //i haven't yet added logic so the player can't kill the enemy, but if it does die, it just resets the postion
        gameBoard[0][0] = 2
    }
    const{ row, cell } = findPlayer()
    const{ enemyRow, enemyCell } = findEnemy()
    const{ decoyRow, decoyCell } = findDecoy()
    //to chase the decoy
    if(findDecoy()) {
        if(decoyRow === enemyRow) {
            if(decoyCell < enemyCell) {
                gameBoard[enemyRow][enemyCell - 1] = 2
                gameBoard[enemyRow][enemyCell] = 0
            } else if(decoyCell > enemyCell) {
                gameBoard[enemyRow][enemyCell + 1] = 2
                gameBoard[enemyRow][enemyCell] = 0
    
            }
        } else if(decoyCell === enemyCell) {
            if(decoyRow < enemyRow) {
                gameBoard[enemyRow - 1][enemyCell] = 2
                gameBoard[enemyRow][enemyCell] = 0
            } else if(decoyRow > enemyRow) {
                gameBoard[enemyRow + 1][enemyCell] = 2
                gameBoard[enemyRow][enemyCell] = 0
            }
        } else if(decoyRow > enemyRow && decoyCell > enemyCell) {
            gameBoard[enemyRow + 1][enemyCell + 1] = 2
            gameBoard[enemyRow][enemyCell] = 0
        } else if(decoyRow < enemyRow && decoyCell < enemyCell) {
            gameBoard[enemyRow - 1][enemyCell -1] = 2
            gameBoard[enemyRow][enemyCell] = 0
        } else if(decoyRow < enemyRow && decoyCell > enemyCell) {
            gameBoard[enemyRow - 1][enemyCell + 1] = 2
            gameBoard[enemyRow][enemyCell] = 0
        } else if(decoyRow > enemyRow && decoyCell < enemyCell) {
            gameBoard[enemyRow + 1][enemyCell - 1] = 2
            gameBoard[enemyRow][enemyCell] = 0
        }
    } else {//to chase the player
        if(row === enemyRow) {
            if(cell < enemyCell) {
                gameBoard[enemyRow][enemyCell - 1] = 2
                gameBoard[enemyRow][enemyCell] = 0
            } else if(cell > enemyCell) {
                gameBoard[enemyRow][enemyCell + 1] = 2
                gameBoard[enemyRow][enemyCell] = 0

            }
        } else if(cell === enemyCell) {
            if(row < enemyRow) {
                gameBoard[enemyRow - 1][enemyCell] = 2
                gameBoard[enemyRow][enemyCell] = 0
            } else if(row > enemyRow) {
                gameBoard[enemyRow + 1][enemyCell] = 2
                gameBoard[enemyRow][enemyCell] = 0
            }
        } else if(row > enemyRow && cell > enemyCell) {
            gameBoard[enemyRow + 1][enemyCell + 1] = 2
            gameBoard[enemyRow][enemyCell] = 0
        } else if(row < enemyRow && cell < enemyCell) {
            gameBoard[enemyRow - 1][enemyCell -1] = 2
            gameBoard[enemyRow][enemyCell] = 0
        } else if(row < enemyRow && cell > enemyCell) {
            gameBoard[enemyRow - 1][enemyCell + 1] = 2
            gameBoard[enemyRow][enemyCell] = 0
        } else if(row > enemyRow && cell < enemyCell) {
            gameBoard[enemyRow + 1][enemyCell - 1] = 2
            gameBoard[enemyRow][enemyCell] = 0
        }

    }

    
    buildGameBoard()
}

const powerUp = () => {
    const{ row, cell } = findPlayer()
    const{ enemyRow, enemyCell } = findEnemy()
    //const{ decoyRow, decoyCell } = findDecoy()
    console.log(totalPowerUps)
    if(totalPowerUps) {
        HUD.innerText = ''
        gameBoard[0][0] = 1
        gameBoard[row][cell] = 3
        totalPowerUps--
        HUD.innerText = `You Have ${totalPowerUps} Power Ups`
        document.body.append(HUD)
    }

}

const buildGameBoard = () => {
    theBoard.innerHTML = ''
    HUDDisplay(theBoard)
    gameBoard.forEach((row, i) => {
        let thisRow = document.createElement('tr')
        row.forEach((cell, j) => {
            let thisCell = document.createElement('td')
            if(cell === 1) {
                thisCell.classList.add('player')
            } else if(cell === 2) {
                thisCell.classList.add('enemy')
            } else if(cell === 3) {
                thisCell.classList.add('decoy')
            }
            thisCell.id = `${i} ${j}`
            thisCell.innerText = cellValue(gameBoard[i][j])
            thisRow.append(thisCell)
        })
        theBoard.append(thisRow)
    })
    document.body.append(theBoard)
}

//Difficulty calculation
let enemySpeed = 300
let difficultyLevel = 0
const difficultyRise = () => {
    clearInterval(enemyAI)
    enemySpeed*= 0.9
    console.log(enemySpeed)
    enemyAI = setInterval(enemyMove, enemySpeed)
    difficultyLevel++
}

let difficulty = setInterval(difficultyRise, 5000)
let enemyAI = setInterval(enemyMove, enemySpeed)
let score = setInterval(timeElapsed, 1000)
let powerUpBuilders = setInterval(buildPowerUps, 10000)
//let HUDRefresh = setInterval(HUDDisplay,1000)


const runGame = () => {
    buildGameBoard()

}

//refresh.addEventListener('click', runGame)
document.addEventListener('keydown', movement)


