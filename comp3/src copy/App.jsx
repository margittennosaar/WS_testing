import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Games from './components/Games'
import NoPage from './components/NoPage'
import Layout from './components/Layout'
import GameInfo from './components/Game'
import './App.css'
import axios from 'axios'

function App() {
  const [games, setGames] = useState([])
  const [selected, setSelected] = useState(0)
  
  useEffect(() => {
    axios
      .get('assets/games.json')
      .then(res => {
        console.log(res.data);
        setGames(res.data.games)
      })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Games games={games} setSelected={setSelected}/>} />
          <Route path="game" element={<GameInfo game={games[selected]}/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
