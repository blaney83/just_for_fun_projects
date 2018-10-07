
var origBoard;
const huPlayer = "O";
const aiPlayer = "X";
var emptSq = [];
var ties = 0;
var wins = 0;
var losses = 0;
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


const cells = document.querySelectorAll(".cells");

document.getElementById("easy").style.backgroundColor= "yellow";

startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("ties").innerHTML = ties;
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", turnClick, false);
    }
};

function turnClick(square) {
    if (typeof origBoard[square.target.id] == "number") {
        turn(square.target.id, huPlayer);
        if (!checkTie()) turn(bestSpot(), aiPlayer);
    }

};

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    console.log(origBoard);
    console.log(player);
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
};

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == huPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false)
    }
    declareWinner(gameWon.player == huPlayer ? "You Win!" : "You Lose!");
    gameWon.player == huPlayer ? wins++ : losses++;
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
    console.log(origBoard.filter(s => typeof s == "number"))
    emptSq = origBoard.filter(s => typeof s == "number")
    return origBoard.filter(s => typeof s == "number")
}

function bestSpot() {
    console.log(emptSq[Math.floor(Math.random() * emptSq.length)])
    return emptSq[Math.floor(Math.random() * emptSq.length)];
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[1].removeEventListener('click', turnClick, false);
        };
        declareWinner("Tie Game!");
        ties++;
        return true;
    }
    return false;
}



