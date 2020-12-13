import { useState } from "react";
import VideoPlayer from "./components/video";
import "./App.css";

import Pattern from "./components/pattern";

function App() {
  const [over, setOver] = useState(false);

  return (
    <div className="App">
      <div className="pattern" onMouseOver={() => setOver(!over)}>
        <Pattern color={over ? "#349ADC" : "#3CB39F"} />
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
