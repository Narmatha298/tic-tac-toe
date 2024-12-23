import { useState } from "react";

export default function Player({ initialName, playerSymbol }) {
  const [editable, setEditable] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleClick() {
    setEditable((editable) => !editable);
  }

  function handleOnChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li>
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
