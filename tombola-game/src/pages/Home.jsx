import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function HomePage() {
  const [roomId, setRoomId] = useState(null);
  const navigate = useNavigate();

  const createRoom = async () => {
    const res = await fetch("http://localhost:4000/create-room", { method: "POST" });
    const data = await res.json();
    setRoomId(data.roomId);
    //navigate(`/game/${data.roomId}`); // 🔹 redirect to the game page
  };

  return (
    <div className="p-8 text-black">
      <h1 className="text-3xl font-bold mb-6">Super Admin</h1>
      {!roomId ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={createRoom}
        >
          Create Room
        </button>
      ) : (
        <div>
          <p>Room ID: <strong>{roomId}</strong></p>
          <p>Share this with players to join.</p>
           <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/join")}
          >
            Join Room
          </button>
        </div>
        
      )}
    </div>
  );
}
