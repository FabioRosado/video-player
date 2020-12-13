import { useEffect, useState } from "react"
import VideoPlayer from "./components/video"
import './App.css'

import Pattern from "./components/pattern"



function App() {
  // const color = "#3CB39F"
  const [over, setOver] = useState(false)

  const isMouseOver = () => {
    setOver(!over)
  }

  useEffect(() => {
   const playerArea = document.getElementById("player-area")

    playerArea.addEventListener("mouseover", isMouseOver)

    return () => {
      playerArea.removeEventListener("mouseover", isMouseOver)
    }

  })

  return (
    <div className="App">
      <div className="pattern">
        <Pattern color={over ? "#349ADC": "#3CB39F"} />
      </div>
      <header className="App-header">
        <section id="player-area">
          <VideoPlayer />
        </section>
      </header>
    </div>
  );
}

export default App;
