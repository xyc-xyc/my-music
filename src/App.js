import { useState , useEffect} from 'react'
import './App.css';

function App() {
  const [inited, setInited] = useState(false)
  const [progress, setProgress] = useState(0)
  const [input, setInput] = useState(0)  
  const [audio, setAudio] = useState(null)  

  const init = () => {
    if(!inited) {
      setInited(true)
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext()
      const track = audioContext.createMediaElementSource(document.querySelector('audio'))
      track.connect(audioContext.destination)
    }
  }

  const play = (event) => {   
    init() 
    audio.play()
  }

  const stop = (event) => {
    audio.pause();
  }

  const onchange = event => {
    setInput(event.target.value)
  }

  const seek = even => {
    audio.currentTime = input;
    play()
  }

  useEffect(() => {
    const audio = document.querySelector('audio')
    setAudio(audio)
    const interval = setInterval(() => {
      setProgress(Math.round(audio.currentTime))
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="App">
        <div className="audioController">
          <audio controls>
            <source src="TheOracle.mp3" />
          </audio>
        </div>       
        <button onClick={() => play()}>play</button>
        <button onClick={() => stop()}>stop</button>
        <span>progress:{progress}</span>
        <div>
          <input value = {input} onChange={ onchange } /><button onClick={() => seek()}>{"seek&play"}</button>
        </div>
    </div>
  );
}

export default App;
