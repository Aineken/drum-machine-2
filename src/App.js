import { useEffect, useState } from 'react';
import './App.css';
import {datas} from "./sounds"

function App() {

  const[volume, setVolume] = useState(1)
  
  return (


<div className="bg-info min-vh-100 text-white">
<div className="text-center">
<h2>Drum Machine</h2>
    {datas.map((data)=>{
      return <Pad key={data.id} data={data} volume={volume}/>
    })}

<input type="range" className='w-50' 
step="0.01"
min="0"
max="1"
onChange={(e)=>{setVolume(e.target.value)}}
value={volume}
/>
</div>
</div>

  );
}


function Pad({data,volume}){

useEffect(()=>{
document.addEventListener("keydown", handleKeyPress)

return ()=>{
  document.removeEventListener("keydown", handleKeyPress)
}
})

 
const handleKeyPress = (e)=>{
if (e.keyCode=== data.keyCode){
  playMusic();
}
}


const playMusic=()=>{

  var triggerMusic = document.getElementById(data.keyTrigger)
      triggerMusic.volume = volume;
      triggerMusic.play();

}

  return(
    <>
        <div onClick={playMusic} className="btn btn-secondary p-3 m-4 ">
          <audio src={data.url} id={data.keyTrigger}></audio>
          {data.keyTrigger}
        </div>
    </>
  )
}

export default App;
