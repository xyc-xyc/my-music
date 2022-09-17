import { useState , useEffect} from 'react'

import './App.css';


function App() {
  const [inited, setInited] = useState(false)
  const [progress, setProgress] = useState(0)
  const [input, setInput] = useState(0)

  let audioContext =      null
  let audioElement = null

  const init = () => {
    if (inited) {
      return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    audioContext = new AudioContext();
    audioElement = document.querySelector('audio');
    setInited(true)

    const track = audioContext.createMediaElementSource(audioElement);

    track.connect(audioContext.destination);
  }

  const play = (event) => {
    init()
    let audioElement = document.querySelector('audio');

    audioElement.play();
  }

  const stop = (event) => {
    init()
    let audioElement = document.querySelector('audio');

    audioElement.pause();
  }

  const onchange = event => {
    setInput(event.target.value)
  }

  const seek = even => {
    init()
    let audioElement = document.querySelector('audio');
    audioElement.currentTime = input;
    play()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(Math.round(document.querySelector('audio').currentTime))
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
