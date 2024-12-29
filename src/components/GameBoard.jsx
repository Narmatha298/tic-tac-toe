import { useState } from "react";

export default function GameBoard({ onSelect, board }) {
  return (
    <ol id="game-board">
      {board.map(function (row, rowIndex) {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map(function (playerSymbol, colIndex) {
                return (
                  <li key={colIndex}>
                    <button
                      onClick={() => onSelect(rowIndex, colIndex)}
                      disabled={playerSymbol !== null}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
