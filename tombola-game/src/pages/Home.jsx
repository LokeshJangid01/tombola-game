import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const roomId = uuidv4().slice(0, 6); // simple room ID
    navigate(`/game/${roomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold text-blue-600">Tambola Game</h1>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleCreateRoom}
      >
        Create Room
      </button>
    </div>
  );
}

export default Home;
