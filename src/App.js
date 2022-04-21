import { useEffect, useState } from 'react';
import './App.css';
import {datas} from "./sounds"

function App() {

  const[volume, setVolume] = useState(1)
  const[speed, setSpeed] = useState(0.5)
  const[recording , setRecording] = useState("")

  const playRecording=()=>{

    let index = 0;
    let recordArray = recording.split(" ")
  
    const interval =  setInterval(() => {
    var triggerMusic = document.getElementById(recordArray[index])

      triggerMusic.volume = volume;
      triggerMusic.currentTime = 0;
      triggerMusic.play();
      index++;

 }, 600*speed);

 setTimeout(()=>{
 clearInterval(interval)

 }, 600*speed*recordArray.length-1)



  }
  
  return (


<div className="bg-info min-vh-100 text-white">
<div className="text-center">
<h1>Drum Machine</h1>
    {datas.map((data)=>{
      return <Pad key={data.id} data={data} volume={volume} setRecording={setRecording}/>
    })}

<h2>Volume</h2>
<input type="range" className='w-50' 
step="0.01"
min="0"
max="1"
onChange={(e)=>{setVolume(e.target.value)}}
value={volume}
/>
<h3>{recording}</h3>

{recording&&(
<>
<button onClick={playRecording} className="btn btn-success m-3">
  PLAY
</button>
<button onClick={()=>setRecording("") } className="btn btn-danger m-3">
  CLEAR
</button>
<h2>Speed</h2>
<input type="range" className='w-50' 
step="0.01"
min="0.1"
max="1.2"
onChange={(e)=>{setSpeed(e.target.value)}}
value={speed}
/>
</>

)}


</div>
</div> 

  );
}


function Pad({data,volume, setRecording}){

  const[active, setActive] = useState(false);


useEffect(()=>{
document.addEventListener("keydown", handleKeyPress)

return ()=>{
  document.removeEventListener("keydown", handleKeyPress)
}
});

const handleKeyPress = (e)=>{
if (e.keyCode=== data.keyCode){
  playMusic();
}
}


const playMusic=()=>{
  setActive(true);
  setTimeout(()=>setActive(false),200)
  var triggerMusic = document.getElementById(data.keyTrigger)

      triggerMusic.volume = volume;
      triggerMusic.currentTime = 0;
      triggerMusic.play();
  setRecording( prev=>prev+data.keyTrigger+" ")
}

  return(
    <>
        <div onClick={playMusic} className={`btn btn-primary p-4 m-3 ${active && 'btn-warning'} `}>
          <audio src={data.url} id={data.keyTrigger}></audio>
          {data.keyTrigger}
        </div>
    </>
  )
}

export default App;
