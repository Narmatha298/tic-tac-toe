import { useState } from "react";

export default function Player({
  initialName,
  playerSymbol,
  isActive,
  updatePlayerNames,
}) {
  const [editable, setEditable] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleClick() {
    setEditable((editable) => !editable);
    if (editable) {
      updatePlayerNames(playerSymbol, playerName);
    }
  }

  function handleOnChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editable ? (
          <input
            type="text"
            className="player-name"
            name="playername"
            value={playerName}
            onChange={handleOnChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={handleClick}> {editable ? "Save" : "Edit"} </button>
    </li>
  );
}
