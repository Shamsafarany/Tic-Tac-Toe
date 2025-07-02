const Board = (function (){
    const rows = 3;
    const col = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < col; j++) {
            row.push("");
        }
        board.push(row);
    }
    function getBoard(){
        return board;
    }
    return {getBoard};
})();

console.log(Board.getBoard());

function createPlayer(name, sign) {
    return {name,sign};
}
const p1 = createPlayer("Hala", 'X');
const p2 = createPlayer("Noor", 'O');

const controller = (function gameController(){
    let currentPlayer = p1;
    let gameOver = false;
    let isTie = false;
    let isFull = false;
    const boardArray = Board.getBoard();
    function playTurn(row, col) {
        
        if (boardArray[row][col] === "") {
            boardArray[row][col] = currentPlayer.sign;
            
            checkWinner();
            if (!gameOver) {
            checkTie();
            if (!gameOver) {
                switchPlayer();
            }
        }
        } else {
            alert("this cell is taken");
        }
    }

    function switchPlayer(){
        if (currentPlayer === p1) {
            currentPlayer = p2;
        } else {
            currentPlayer = p1;
        }
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }
    function checkWinner(){
        const winningCombinations = [
                // Rows
                [[0, 0], [0, 1], [0, 2]],
                [[1, 0], [1, 1], [1, 2]],
                [[2, 0], [2, 1], [2, 2]],

                // Columns
                [[0, 0], [1, 0], [2, 0]],
                [[0, 1], [1, 1], [2, 1]],
                [[0, 2], [1, 2], [2, 2]],

                // Diagonals
                [[0, 0], [1, 1], [2, 2]],
                [[0, 2], [1, 1], [2, 0]],
                ];
                for (let combo of winningCombinations) {
                    console.log(winningCombinations[combo]);
                    const [a, b, c] = combo;
                    if (boardArray[a[0]][a[1]] === boardArray[b[0]][b[1]] &&
                      boardArray[b[0]][b[1]] === boardArray[c[0]][c[1]] && 
                      boardArray[a[0]][a[1]] !== "") {
                        console.log(getCurrentPlayer().name + " won");
                        gameOver = true;
                        if (gameOver) {
                            console.log("Game OVER!!!");
                            return;
                        }
                      }
                }
    }
    function checkTie(){
        if (gameOver) {
                return;
            }
        for (let i = 0; i < boardArray.length; i++) {  
            for (let j = 0; j <  boardArray.length; j++) {
                if (boardArray[i][j] === ""){
                    return;
                } 
            }
            }
            isTie = true;
            gameOver= true;
            console.log("We've reached a TIE!");
            console.log("Game OVER!!")
        
    }
    return {playTurn, getCurrentPlayer};
})();

controller.playTurn(0,0);
controller.playTurn(1,1);
controller.playTurn(0,1);
controller.playTurn(1,0);
controller.playTurn(2,1);
controller.playTurn(0,2);
controller.playTurn(1,2);
controller.playTurn(2,2);
controller.playTurn(2,0);




