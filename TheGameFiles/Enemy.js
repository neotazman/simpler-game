const enemy = {
    find: () => { //finds the enemy's position
        for(let enemyRow = 0; enemyRow < gameBoard.length; enemyRow++) {
            for(let enemyCell = 0; enemyCell < gameBoard[enemyRow].length; enemyCell++) {
                if(cellValue(gameBoard[enemyRow][enemyCell]) === 'enemy') {
                    return {enemyRow, enemyCell}
                }
            }
        }
        return false
    },
    move: () => { //checks the player's position and the enemy's position and moves the enemy towards the player
        if(!enemy.find()) { //i haven't yet added logic so the player can't kill the enemy, but if it does die, it just resets the postion
            gameBoard[0][0] = 2
        }
        const{ row, cell } = findPlayer()
        const{ enemyRow, enemyCell } = enemy.find()
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
    },
    speed: 300,
    difficulty: 0,
    difficultyRise: () => { //the callback to increase on a timer
        clearInterval(enemyAI)
        enemy.speed*= 0.9
        enemyAI = setInterval(enemy.move, enemy.speed)
        difficultyLevel++
    },

}
