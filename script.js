

const Gameboard = () => {
    const rows = 3;
    const columns = 3;
    const gameboard = [];

    //Create a 2d array
    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (let j = 0; j < columns; j++) {
            gameboard[i].push(Cell());
        }
    }
    const updateGameboard = (row, column, playerMarker) => {
        const focusCell = gameboard[row][column].getValue();
        if (focusCell != "") return;
        console.log(focusCell);
        console.log(playerMarker);
        //if the Cell on which the player wants to make the msoves is not empty, stop executing


        gameboard[row][column].addMarker(playerMarker);

    }
    const printGameboard = () => {
        const boardWithCellValues =
            gameboard.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }
    const getGameboard = () => gameboard;

    return {
        getGameboard,
        updateGameboard,
        printGameboard
    }
}
const Cell = () => {
    let value = "";

    const addMarker = (playerMarker) => {
        value = playerMarker;
    };

    const getValue = () => value;

    return {
        addMarker,
        getValue
    };

}

const Player = (name, marker) => {
    //other functions for players
    const getName = () => name;
    const getMarker = () => marker;

    return { getName, getMarker }
}
const GameController = (playerOne, playerTwo) => {

    const players = [playerOne, playerTwo];
    let activePlayer = players[0];
    let board = Gameboard();
    displayController().renderPlayer(playerOne,playerTwo);

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];

        displayController().renderActivePLayer(activePlayer);
       
    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printGameboard();
        displayController().renderGameboard(board);
        console.log(` ${getActivePlayer().getName()} 's turn`);
    };

    const playRound = ([row, column]) => {
        console.log(`${getActivePlayer().getName()} put an ${getActivePlayer().getMarker()} on position ${[row, column]}`);
        board.updateGameboard(row, column, getActivePlayer().getMarker());
       
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}


const displayController = () => {
    

    let nodeGameboard = document.getElementById("gameboard");
    let playerOneName = document.getElementById("playerOne");
    let playerOneMarker = document.getElementById("markerOne");
    let playerTwoName = document.getElementById("playerTwo");
    let playerTwoMarker = document.getElementById("markerTwo");
    let winPlayerOne=document.getElementById('winOne').children[0]
    let winPlayerTwo =document.getElementById('winTwo').children[0]
    const renderGameboard=(board)=>{
        for (let i = 0; i < nodeGameboard.children.length; i++) {
            if (i < 3) {
                nodeGameboard.children[i].textContent = board.getGameboard()[0][i].getValue()
                
            }
            if (i >= 3 && i < 6) {
                nodeGameboard.children[i].textContent = board.getGameboard()[1][i -3].getValue()
            }
            if (i >= 6) {
                nodeGameboard.children[i].textContent = board.getGameboard()[2][i - 6].getValue();
            }
        }
    }
    const renderPlayer =(playerOne, playerTwo)=>{
        playerOneName.textContent=playerOne.getName();
        playerOneMarker.textContent = playerOne.getMarker();
        playerTwoName.textContent = playerTwo.getName();
        playerTwoMarker.textContent = playerTwo.getMarker();
        winPlayerOne.textContent = playerOne.getName();
        winPlayerTwo.textContent = playerTwo.getName();
    }
    const renderActivePLayer =(activePlayer)=>{
        console.log(`active ${activePlayer.getName()}`)
        if(activePlayer.getName()==playerOne.textContent){
            playerTwoName.classList.remove('activePlayer');
            playerOneName.classList.add('activePlayer');
        }else{
            playerTwoName.classList.add('activePlayer');
            playerOneName.classList.remove('activePlayer');
        }
    }
    return{renderGameboard, 
        renderPlayer, renderActivePLayer}
}
const startGame=()=>{

const game = GameController(Player("LAvinia", "O"), Player("Larisa", "X"));
let nodeGameboard = document.getElementById("gameboard");

//add click listener for cells
for (let i = 0; i < nodeGameboard.children.length; i++) 
{
    if (i < 3) {
        nodeGameboard.children[i].addEventListener('click',()=>{
            game.playRound([0,i])
        })
    }
    if (i >= 3 && i < 6) {
        nodeGameboard.children[i].addEventListener('click',()=>{
            game.playRound([1,i-3])
        })
    }
    if (i >= 6) {
        nodeGameboard.children[i].addEventListener('click',()=>{
            game.playRound([2,i-6])
        })
    }
}}
startGame();