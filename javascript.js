const board = (function (){
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
console.log(board.getBoard());

function createPlayer(name, sign) {
    return {name,sign};
}

const p1 = createPlayer("Hala", 'X');
const p2 = createPlayer("Noor", 'O');

const controller = (function gameController(){
    let currentPlayer = p1;
    
    function playTurn(row, col) {
        const boardArray = board.getBoard();
        if (boardArray[row][col] === "") {
            boardArray[row][col] = currentPlayer.sign;
            switchPlayer();
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
    return {playTurn, getCurrentPlayer};
})();

controller.playTurn(0,0);
controller.playTurn(1,1);
controller.playTurn(1,1);
controller.playTurn(2,0);

