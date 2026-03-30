import { useState, useRef, useEffect, Link } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Game from './pages/Game'
import './App.css'

function App() {
  
  return (
      <BrowserRouter>
      <Routes>
        <h1>Bienvenido al Escape Room 🔐</h1>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
