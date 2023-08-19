

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
    const getBoardValueAt=(row,column)=>{
        return gameboard[row][column].getValue();
    }
    const reset=()=>{
        for (let i = 0; i < rows; i++) {
            gameboard[i] = [];
            for (let j = 0; j < columns; j++) {
                gameboard[i].push("");
            }
        }
    }

    const printGameboard = () => {
        const boardWithCellValues =
            gameboard.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }
    const getGameboard = () => gameboard;
    
    return {reset,
        getGameboard,
        updateGameboard,
        printGameboard,
        getBoardValueAt
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
    const WINNING_COMBINATIONS =[
        ['00','01','02'],
        ['10','11','12'],
        ['20','21','22'],
        ['00','10','20'],
        ['01','11','21'],
        ['02','12','22'],
        ['00','11','22'],
        ['20','11','02']
    ]


    const players = [playerOne, playerTwo];
    let activePlayer = players[0];
    let board = Gameboard();

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
        if(checkWin(getActivePlayer().getMarker()))
            return;
        checkDraw();
        
        switchPlayerTurn();
        printNewRound();
    }
    const checkWin=(marker)=>{
        if(WINNING_COMBINATIONS.some(combination=>{
            console.log(combination)
            return combination.every(index=>{
                return board.getBoardValueAt(index.charAt(0),index.charAt(1))==marker;
            })
        })){
            console.log(`${getActivePlayer().getName()} won`);
            displayController().renderWinner(getActivePlayer().getName());
            return true;
        }else{
            return false;
        }

    }
    const checkDraw=()=>{

    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}


const displayController = () => {
    let winnerDiv=document.getElementById("winner");
    let playerTurn= document.getElementById("activePlayer");
    let nodeGameboard = document.getElementById("gameboard");
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
    const renderWinner=(winner)=>{
        winnerDiv.style.display="grid";
        winnerDiv.textContent=`${winner} won`;
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
        renderMark, renderActivePLayer,
        renderWinner
    }
}
const startGame = (event) => {
    

    let PlayerOneName = document.getElementById('playerOneName').value;
    let PlayeTwoName = document.getElementById('playerTwoName').value;
console.log(PlayerOneName)
    document.getElementById("formPlayerInfo").style.display="none";
    
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
