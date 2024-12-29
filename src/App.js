import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";

const INITIALBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveBoard(gameTurns) {
  let board = [...INITIALBOARD.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    board[row][col] = player;
  }

  return board;
}

function deriveWinner(board, playerNames) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = board[combination[0].row][combination[0].col];
    const secondSquareSymbol = board[combination[1].row][combination[1].col];
    const thirdSquareSymbol = board[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerNames[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [playerNames, setPlayerNames] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const board = deriveBoard(gameTurns);

  const winner = deriveWinner(board, playerNames);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      let currentPlayer = "X";
      if (prevGameTurns.length > 0 && prevGameTurns[0].player === "X") {
        currentPlayer = "O";
      }
      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];
    });
  }

  function handleUpdatePlayerNames(symbol, newName) {
    setPlayerNames((prev) => {
      return { ...prev, [symbol]: newName };
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            playerSymbol="X"
            isActive={activePlayer === "X"}
            updatePlayerNames={handleUpdatePlayerNames}
          />
          <Player
            initialName={PLAYERS.O}
            playerSymbol="O"
            isActive={activePlayer === "O"}
            updatePlayerNames={handleUpdatePlayerNames}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} restart={handleRestart} />
        )}
        <GameBoard onSelect={handleActivePlayer} board={board} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
