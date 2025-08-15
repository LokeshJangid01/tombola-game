import React, { useState } from "react";
import generateTicket from "../utils/generateTicket";
import { checkWinPatterns } from '../utils/checkWinPatterns';

const getNumberPool = () => {
  return Array.from({ length: 90 }, (_, i) => i + 1);
};

const getAllNumbersFromTicket = (ticket) => {
  return ticket.flat().filter(Boolean); // filters out nulls or empty values
};

const Game = () => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const [numberPool, setNumberPool] = useState(getNumberPool());
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [lastCalled, setLastCalled] = useState(null);
  const [winner, setWinner] = useState(null);
  const [lineWinners, setLineWinners] = useState({
        top: null,
        middle: null,
        bottom: null,
        });
    const [winTracker, setWinTracker] = useState({
    earlyFive: null,
    star: null,
    });


 const handleJoin = () => {
  if (!name.trim()) return;
  if (players.length >= 4) {
    alert("Room full! Only 4 players allowed.");
    return;
  }

  const ticket = generateTicket();
  setPlayers((prev) => [...prev, { name, ticket }]);
  setName("");
  console.log("Player joined:", name, ticket);

  // 👉 Establish WebSocket connection here
  const socket = new WebSocket(`ws://localhost:4000/ws/${name}`);

  socket.onopen = () => {
    console.log("Connected to FastAPI WebSocket");
    socket.send("Player joined!");
  };

  socket.onmessage = (event) => {
    console.log("Message from server:", event.data);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
};

const callNextNumber = () => {
  if (numberPool.length === 0 || winner) return;

  const randomIndex = Math.floor(Math.random() * numberPool.length);
  const number = numberPool[randomIndex];

  const updatedPool = [...numberPool];
  updatedPool.splice(randomIndex, 1);

  setCalledNumbers((prevCalled) => {
    const newCalled = [...prevCalled, number];

    // ✅ Refactored pattern checker
    checkWinPatterns({
      players,
      calledNumbers: newCalled,
      setWinner,
      lineWinners,
      setLineWinners,
      winner,
      winTracker,
      setWinTracker,
    });

    return newCalled;
  });

  setNumberPool(updatedPool);
  setLastCalled(number);
};


  const isCalled = (num) => calledNumbers.includes(num);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">🎲 Tambola Room</h1>
      {winner && (
        <div className="bg-green-600 text-white text-center font-bold py-3 rounded mb-4">
            {winner}
        </div>
        )}
   <div className="mt-6 p-4 text-black bg-gray-100 rounded shadow text-center">
        <div className="text-lg font-semibold">Win Patterns</div>
        <div>Top Line: {lineWinners.top || "Not won yet"}</div>
        <div>Middle Line: {lineWinners.middle || "Not won yet"}</div>
        <div>Bottom Line: {lineWinners.bottom || "Not won yet"}</div>
        <div>Early Five: {winTracker.earlyFive || "Not won yet"}</div>
        <div>Star: {winTracker.star || "Not won yet"}</div>
        <div>Full House: {winner || "Not won yet"}</div>
    </div>

      {/* Join Form */}
      <div className="flex items-center gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Enter your name"
          className="border border-gray-300 text-black px-4 py-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={handleJoin}
        >
          Join Room
        </button>
      </div>

      {/* Number Caller */}
      <div className="flex flex-col text-black items-center mb-8">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md mb-4"
          onClick={callNextNumber}
          disabled={numberPool.length === 0}
        >
          {numberPool.length === 0 ? "All Numbers Called" : "Call Next Number"}
        </button>
        {lastCalled && (
          <div className="text-xl font-bold text-red-600">
            Last Called: {lastCalled}
          </div>
        )}
      </div>

      {/* Player Slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="border border-gray-300 p-4 rounded-md shadow-sm min-h-[220px]"
          >
            {players[idx] ? (
              <div>
                <div className="text-lg font-semibold text-green-600 mb-2">
                  {players[idx].name}
                </div>
                <table className="table-auto text-black border border-gray-400 w-full text-center text-sm">
                  <tbody>
                    {players[idx].ticket.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`border w-8 h-8 ${
                              cell
                                ? isCalled(cell)
                                  ? "bg-yellow-400 text-black"
                                  : "bg-white"
                                : "bg-gray-100"
                            }`}
                          >
                            {cell || ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <span className="text-gray-400">
                Waiting for Player {idx + 1}...
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Full Number Board */}
        <div className="mt-10">
        <h2 className="text-xl font-bold text-center mb-4">Number Board</h2>
        <div className="grid grid-cols-10 gap-2 max-w-md mx-auto">
            {Array.from({ length: 90 }, (_, i) => i + 1).map((num) => (
            <div
                key={num}
                className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm font-semibold
                ${
                    calledNumbers.includes(num)
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-200 text-gray-500"
                }`}
            >
                {num}
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default Game;
