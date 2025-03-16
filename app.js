const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
let scoreBoardX = document.getElementById("x");
let scoreBoardO = document.getElementById("o");
const resetButton = document.getElementById("reset");
const xs = document.getElementById("xs");
const os = document.getElementById("os");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]  
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);

function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins! 🎉`;
        if(statusText.textContent==="X wins! 🎉"){
            xs.innerText++;
        }else{
            os.innerText++;
        };
     
        gameActive = false;
        
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => (cell.textContent = ""));
}
