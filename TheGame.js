
let theBoard = document.createElement('table')
let refresh = document.getElementById('refresh');

const gameBoard = [ // where the game state is stored
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]

const cellValue = (cell) => { //reads the 1 as the player and 2 as the enemy
    if(cell === 0) return 'empty'
    else if(cell === 1) return 'player'
    else if(cell === 2) return 'enemy'
}

const findPlayer = () => { //finds the player's position
    for(let row = 0; row < gameBoard.length; row++) {
        for(let cell = 0; cell < gameBoard[row].length; cell++) {
            if(cellValue(gameBoard[row][cell]) === 'player') {
                return {row, cell}
            }
        }
    }
    document.write('YOU LOSE')
    return false
}

const findEnemy = () => { //finds the enemy's position
    for(let enemyRow = 0; enemyRow < gameBoard.length; enemyRow++) {
        for(let enemyCell = 0; enemyCell < gameBoard[enemyRow].length; enemyCell++) {
            if(cellValue(gameBoard[enemyRow][enemyCell]) === 'enemy') {
                return {enemyRow, enemyCell}
            }
        }
    }
}

//the movement functions
const moveRight = () => {
    const{ row, cell } = findPlayer()
    console.log(row, cell)
    if(cell === 7) {
        return
    }
    gameBoard[row][cell + 1] = 1
    gameBoard[row][cell] = 0
    console.log(gameBoard)
}

const moveLeft = () => {
    const{ row, cell } = findPlayer()
    if(cell === 0) {
        return
    }
    gameBoard[row][cell - 1] = 1
    gameBoard[row][cell] = 0
}

const moveUp = () => {
    const{ row, cell } = findPlayer()
    if(row === 0) {
        return
    }
    gameBoard[row - 1][cell] = 1
    gameBoard[row][cell] = 0
}

const moveDown = () => {
    const{ row, cell } = findPlayer()
    if(row === 7) {
        return
    }
    gameBoard[row + 1][cell] = 1
    gameBoard[row][cell] = 0
}

const movement = (e) => {
    e.preventDefault()
    console.log(e)
    if(e.keyCode === 39) {
        moveRight()
    } else if(e.keyCode === 37) {
        moveLeft()
    } else if(e.keyCode === 38) {
        moveUp()
    } else if(e.keyCode === 40) {
        moveDown()
    }

    buildGameBoard()
}

//the enemy functions
const enemyMove = () => {
    const{ row, cell } = findPlayer()
    const{ enemyRow, enemyCell } = findEnemy()
    console.log(enemyRow, row)
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
        
    }
    
    buildGameBoard()
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

refresh.addEventListener('click', buildGameBoard)
document.addEventListener('keydown', movement)
setInterval(enemyMove, 3000)