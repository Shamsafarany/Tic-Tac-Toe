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

function createPlayer(name, sign) {
    return {name,sign};
}
const form = document.querySelector("form");

const Name = (function() {
    let p1 = null;
    let p2 = null;
    function getNames(){
        form.addEventListener("submit", (event) => {
        event.preventDefault();
        let player1 = event.target.p1.value;
        let player2 = event.target.p2.value;
        player1 = player1.charAt(0).toUpperCase() + player1.slice(1);
        player2 = player2.charAt(0).toUpperCase() + player2.slice(1);
        p1 = createPlayer(player1, 'X');
        p2 = createPlayer(player2, 'O');

        form.classList.add("hidden");
        controller.startGame();
        Display.update();
    })
    }
    function getP1(){
        return p1;
    }
    function getP2(){
        return p2;
    }
    
    return {getP1, getP2, getNames};
})();

Name.getNames();

const scoreP1 = document.querySelector(".p1");
const scoreP2 = document.querySelector(".p2");

const controller = (function gameController(){
    let currentPlayer = null;
    let gameOver = false;
    let isTie = false;
    let p1Score = 0;
    let p2Score = 0;
    const boardArray = Board.getBoard();
    function startGame(){
        currentPlayer = Name.getP1();
        gameOver = false;
        isTie = false;
        turns.innerHTML = `${controller.getCurrentPlayer().name}'s turn`;
        scoreP1.innerHTML = `${Name.getP1().name}: 0`;
        scoreP2.innerHTML = `${Name.getP2().name}: 0`;
    }
    
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
        if (currentPlayer.name === Name.getP1().name) {
            currentPlayer = Name.getP2();
        } else {
            currentPlayer = Name.getP1();
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
                    const [a, b, c] = combo;
                    if (boardArray[a[0]][a[1]] === boardArray[b[0]][b[1]] &&
                      boardArray[b[0]][b[1]] === boardArray[c[0]][c[1]] && 
                      boardArray[a[0]][a[1]] !== "") {
                        console.log(getCurrentPlayer().name + " won");
                        if (getCurrentPlayer() === Name.getP1()) {
                            p1Score++;
                        } else {
                            p2Score++;
                        }
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
        function getGameOver(){
            return gameOver;
        }
        function setGameOver(state) {
            gameOver = state;
        }
        function getisTie(){
            return isTie;
        }
        function setisTie(state) {
            isTie = state;
        }
        function getP1Score(){
            return p1Score;
        }
        function getP2Score(){
            return p2Score;
        }

    return {playTurn, getCurrentPlayer, getGameOver, setGameOver, getisTie, setisTie, startGame, getP1Score, getP2Score};
})();
const cells = document.querySelectorAll(".cell");
const turns = document.querySelector(".turns");
const Display = (function() {
    const board = Board.getBoard();
    function clearBoardListeners() {
                for (let i = 0; i < cells.length; i++) {
                    const newCell = cells[i].cloneNode(true); // clone the cell without any event listeners
                    cells[i].replaceWith(newCell);            // replace the old cell with the clean one
                }
            }
    function update(){
        for(let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {   
                    const index = i * board[i].length + j; // Convert 2D to 1D index  
                    cells[index].addEventListener("click", () => {
                    if (controller.getGameOver()) {
                        return;
                    }
                    controller.playTurn(i,j);
                    turns.innerHTML = `${controller.getCurrentPlayer().name}'s turn`;
                    cells[index].innerHTML = board[i][j]; 
                    if (controller.getGameOver()) {
                        Results.showResults(); 
                        return;
                    }      
                })                    
            }
        }
}
     return {update, clearBoardListeners};
})();

const restart = document.querySelector("#restart");
const reset = document.querySelector("#reset");
const Restart = (function () {
    const board = Board.getBoard();
    function remove(){
        restart.addEventListener("click", () => {
            for (let i = 0; i < cells.length; i++) {
                    cells[i].innerHTML = "";
                }
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length; j++) {
                        board[i][j] = "";
                    }
                 }
                controller.setGameOver(false);
                displayResults.classList.remove("show");
        })}     
        return {remove};
})();

const Reset = (function(){
    const board = Board.getBoard();
    function resets(){
        reset.addEventListener("click", () => {
            for (let i = 0; i < cells.length; i++) {
                    cells[i].innerHTML = "";
                }
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length; j++) {
                        board[i][j] = "";
                    }
                 }
                controller.setGameOver(false);
                controller.setisTie(false);
                displayResults.classList.remove("show");
                form.classList.remove("hidden");
                Display.clearBoardListeners();
                Display.update();
                form.reset();

        })}     
        return {resets};
    })();

Restart.remove();
Reset.resets();

const displayResults = document.querySelector(".display-results");
const Results = (function (){
    function showResults(){
        if(controller.getGameOver()) {
        displayResults.classList.add("show");
        if (controller.getisTie()) {
            displayResults.innerHTML = "It's A TIE!!";
            controller.setisTie(false);
        } else {
             displayResults.innerHTML = `${controller.getCurrentPlayer().name}` + " WON!";
             scoreP1.innerHTML = `${Name.getP1().name}: ${controller.getP1Score()}`;
            scoreP2.innerHTML = `${Name.getP2().name}: ${controller.getP2Score()}`;
        }      
     }
    }
    form.classList.remove("hidden");
    return ({showResults});
})();
