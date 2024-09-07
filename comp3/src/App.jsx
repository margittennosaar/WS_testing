import { useState, useEffect } from 'react'
import axios from 'axios'
import screens from "./screens.js"
import './App.css'

import Games from './components/Games'
import NoPage from './components/NoPage'
import Header from './components/Header'
import GameInfo from './components/GameInfo'
import Footer from './components/Footer'
import HeroBanner from './components/HeroBanner'

import gamesJson from '../assets/games.json'

function App() {
  const [games, setGames] = useState([])
  const [screen, setScreen] = useState(screens.HOME)
  const [selected, setSelected] = useState(0)
  
  useEffect(() => {
    // axios
    //   .get('https://8975.sollertis.host/static/games.json')
    //   .then(res => {
    //     console.log(res.data); 
    //     setGames(res.data.games)
    //   })
    setGames(gamesJson.games)
  }, [])

  switch (screen) {
    case screens.HOME: {
      return (
        <>
          <Header setScreen={setScreen}/>
          <HeroBanner />
          <main>
            <Games games={games} setSelected={setSelected} setScreen={setScreen}/>
          </main>
          <Footer/>
        </>
      )
    }
    
    case screens.GAME_INFO: {
      return (
        <>
          <Header setScreen={setScreen}/>
          <main>
            <GameInfo game={games[selected]}/>
          </main>
          <Footer/>
        </>
      )
    }

    default: {
      return (
        <>
          <Header setScreen={setScreen}/>
          <NoPage />
          <Footer/>
        </>
      )
    }
  }
}

export default App
