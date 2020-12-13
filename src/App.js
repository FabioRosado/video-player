import VideoPlayer from "./components/video"
import './App.css';



function App() {


  return (
    <div className="App">
      <img className="pattern" src="/images/pattern2.svg" />
      <header className="App-header">
        <VideoPlayer />
      </header>
    </div>
  );
}

export default App;
