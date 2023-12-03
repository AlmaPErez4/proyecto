var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

var tiempoTranscurrido = 0;
var intervalo;


window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //Iniciar el cronometro al poner la primera ficha
    iniciarCronometro();

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c]; 

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array

    checkWinner();
}

function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    if (gameOver) {
        detenerCronometro(); // Detener el cronómetro si se ha ganado la partida
    }
}

function iniciarCronometro() {
    // Iniciar el intervalo solo si aún no se ha iniciado
    if (!intervalo) {
        intervalo = setInterval(actualizarCronometro, 1000); // Actualizar cada segundo
    }
}

function detenerCronometro() {
    clearInterval(intervalo);
    intervalo = null; // Reiniciar el intervalo para futuras partidas
}

function actualizarCronometro() {
    tiempoTranscurrido += 1;
    document.getElementById("cronometro").innerText = `Tiempo: ${tiempoTranscurrido} segundos`;
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = `Fin de la partida, duración: ${tiempoTranscurrido} segundos. ¡Ganan las fichas rojas!`;

    } else {
        winner.innerText = `Fin de la partida, duración: ${tiempoTranscurrido} segundos. ¡Ganan las fichas amarillas!`;

    }
    detenerCronometro(); // Detener el cronómetro cuando se ha ganado la partida
    gameOver = true;
}


function reiniciarJuego() {
    detenerCronometro(); // Detener el cronómetro actual si está en funcionamiento
    tiempoTranscurrido = 0; // Reiniciar el tiempo
    document.getElementById("cronometro").innerText = "Tiempo: 0 segundos"; // Actualizar la visualización del tiempo
    gameOver = false; // Restablecer el estado del juego

    // Limpiar el contenido del elemento que contiene el tablero
    var boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";

    // Volver a inicializar el juego
    setGame();

    document.getElementById("winner").innerText = ""; // Limpiar el mensaje de ganador
}





