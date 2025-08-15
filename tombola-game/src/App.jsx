import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./pages/Home";
import Game from "./pages/Game";
import JoinRoom from "./pages/JoinRoom";


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/game/:roomId" element={<Game />} /> */}
        <Route path="/join" element={<JoinRoom />} />
      </Routes>
    </div>
  )
}

export default App
