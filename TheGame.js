

let theBoard = document.createElement('table')
let refresh = document.getElementById('refresh') //isn't working with the enemy AI

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
]

const cellValue = (cell) => { //reads the 1 as the player and 2 as the enemy
    if(cell === 0) return 'empty'
    else if(cell === 1) return 'player'
    else if(cell === 2) return 'enemy'
}

const findPlayer = () => { //finds the player's position. also checks if the player loses
    for(let row = 0; row < gameBoard.length; row++) {
        for(let cell = 0; cell < gameBoard[row].length; cell++) {
            if(cellValue(gameBoard[row][cell]) === 'player') {
                return {row, cell}
            }
        }
    }
    document.write(`YOU LOSE! You scored ${secondsElapsed}`)
    clearInterval(enemyAI)
    clearInterval(score)
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

//the movement functions
const moveRight = () => {
    const{ row, cell } = findPlayer()
    console.log(row, cell)
    if(cell === gameBoard[row].length -1) {
        gameBoard[row][0] = 1
        gameBoard[row][cell] = 0
        return
    }
    gameBoard[row][cell + 1] = 1
    gameBoard[row][cell] = 0
    console.log(gameBoard)
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
    console.log(e)
    if(e.keyCode === 39 || e.keyCode === 68) {
        moveRight()
    } else if(e.keyCode === 37 || e.keyCode === 65) {
        moveLeft()
    } else if(e.keyCode === 38 || e.keyCode === 87) {
        moveUp()
    } else if(e.keyCode === 40 || e.keyCode === 83) {
        moveDown()
    }

    buildGameBoard()
}

const enemyMove = () => { //checks the player's position and the enemy's position and moves the enemy towards the player
    if(!findEnemy()) { //i haven't yet added logic so the player can't kill the enemy, but if it does die, it just resets the postion
        gameBoard[0][0] = 2
    }
    const{ row, cell } = findPlayer()
    const{ enemyRow, enemyCell } = findEnemy()
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
            gameBoard[enemyRow][enemyCell + 1] = 2
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
    
    buildGameBoard()
}

const powerUp = (e) => {
    if(e.keyCode === )
}

const buildGameBoard = () => {
    theBoard.innerHTML = ''
    gameBoard.forEach((row, i) => {
        let thisRow = document.createElement('tr')
        row.forEach((cell, j) => {
            let thisCell = document.createElement('td')
            if(cell === 1) {
                thisCell.classList.add('player')
            } else if(cell === 2) {
                thisCell.classList.add('enemy')
            }
            thisCell.id = `${i} ${j}`
            thisCell.innerText = cellValue(gameBoard[i][j])
            thisRow.append(thisCell)
        })
        theBoard.append(thisRow)
    })
    document.body.append(theBoard)
}

let enemyAI = setInterval(enemyMove, 200)
let score = setInterval(timeElapsed, 1000)


const runGame = () => {
    buildGameBoard()
    enemyAI()
    score()
}

refresh.addEventListener('click', runGame)
document.addEventListener('keydown', movement)


