import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/join-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, playerName }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setError(data.error || "Failed to join room");
        return;
      }

      // ✅ Redirect to game page
      navigate(`/game/${roomId}?name=${encodeURIComponent(playerName)}`);
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="p-8 text-black flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Join a Room</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleJoin} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Join Room
        </button>
      </form>
    </div>
  );
}
