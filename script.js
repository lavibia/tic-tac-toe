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

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
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
    const renderGameboard=(board)=>{
        for (let i = 0; i < nodeGameboard.children.length; i++) {
            if (i < 3) {
                nodeGameboard.children[i].textContent = board.getGameboard()[0][i].getValue()
            }
    
            if (i >= 3 && i < 6) {
    
    
                nodeGameboard.children[i].textContent = board.getGameboard()[1][i -3].getValue()
            }
            if (i >= 6) {
                nodeGameboard.children[i].textContent = board.getGameboard()[2][i - 6].getValue()
            }
        }
    }
    return{renderGameboard}
   
}


const game = GameController(Player("LAvinia", "X"), Player("Larisa", "O"));
game.playRound([0, 1]);
game.playRound([1, 2]);
game.playRound([1, 1]);
game.playRound([1, 0]);
game.playRound([2, 2]);