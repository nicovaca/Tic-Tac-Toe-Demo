import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./components/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
}
const INITIAL_GAME_BOARD = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}
function deriveWinner(gameBoard,players) {
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSymbol = gameBoard[combination[0].row][combination[0].col];
        const secondSymbol= gameBoard[combination[1].row][combination[1].col];
        const thirdSymbol= gameBoard[combination[2].row][combination[2].col];
        if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
            winner = players[firstSymbol];
        }
    }
    return winner;
}
function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];
    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    return gameBoard;
}
function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard,players);
    const draw = gameTurns.length === 9 && !winner;
    function handleSelectePlayer(rowIndex, colIndex) {
        setGameTurns(prevTurn => {
            const currentPlayer = deriveActivePlayer(prevTurn);
            return [{
                square: {row: rowIndex, col: colIndex},
                player: currentPlayer
            },
                ...prevTurn];
        })
    }
    function handleRestart() {
        setGameTurns([]);
    }
    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        })
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name={PLAYERS.X} symmbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
                    <Player name={PLAYERS.O} symmbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
                </ol>
                {(winner || draw) && <GameOver winner={winner} rematch{handleRestart}/>}
                <GameBoard onSelectedPlayer={handleSelectePlayer} board={gameBoard}/>
            </div>
            <Log turns={gameTurns}/>
        </main>
    )
}

export default App
