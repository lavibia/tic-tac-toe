

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
    displayController().renderPlayer(playerOne, playerTwo);

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];


    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printGameboard();
        console.log(` ${getActivePlayer().getName()} 's turn`);

        displayController().renderActivePLayer(getActivePlayer());
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

    let playerTurn= document.getElementById("activePlayer");
    let nodeGameboard = document.getElementById("gameboard");
    let winPlayerOne = document.getElementById('winOne').children[0]
    let winPlayerTwo = document.getElementById('winTwo').children[0]
    const renderMark = (cell) => {
        if(nodeGameboard.classList.contains("x")){
            cell.classList.remove("circle")
            cell.classList.add("x")
        }
        else{
            cell.classList.remove("x")
            cell.classList.add("circle")
        }
        }
    
    const renderPlayer = (playerOne, playerTwo) => {
        winPlayerOne.textContent = playerOne.getName();
        winPlayerTwo.textContent = playerTwo.getName();
    }
    const renderActivePLayer = (activePlayer) => {
        console.log(`active ${activePlayer.getName()}`)
        playerTurn.textContent=`${activePlayer.getName()}'s turn`;
        if(activePlayer.getMarker()=="X"){
            nodeGameboard.classList.remove("circle");
            nodeGameboard.classList.add("x");

        }
        else{
            nodeGameboard.classList.add("circle");
            nodeGameboard.classList.remove("x");
        }
    }
    return {
        // renderGameboard,
        renderMark,
        renderPlayer, renderActivePLayer
    }
}
const startGame = (event) => {
    document.getElementById("formPlayerInfo").style.display="none";

    let PlayerOneName = document.getElementById('playerOneName').value;
    let PlayeTwoName = document.getElementById('playerTwoName').value;
console.log(PlayerOneName)
    
    const game = GameController(Player(PlayerOneName ="Player One", "X"), Player(PlayeTwoName ="Player Two", "O"));


    let nodeGameboard = document.getElementById("gameboard");

    //add click listener for cells
    for (let i = 0; i < nodeGameboard.children.length; i++) {
        if (i < 3) {
            nodeGameboard.children[i].addEventListener('click', () => {
                displayController().renderMark(nodeGameboard.children[i])
                game.playRound([0, i])
                
            },{once:true})
        }
        if (i >= 3 && i < 6) {
            nodeGameboard.children[i].addEventListener('click', () => {
                displayController().renderMark(nodeGameboard.children[i])
                game.playRound([1, i - 3])
            },{once:true})
        }
        if (i >= 6) {
            nodeGameboard.children[i].addEventListener('click', () => {
                displayController().renderMark(nodeGameboard.children[i])
                game.playRound([2, i - 6])
            },{once:true})
        }
    }
    event.preventDefault();
}
document.getElementById("startButton").addEventListener('click', startGame, false);
