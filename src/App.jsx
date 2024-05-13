import { useState, useEffect, useRef } from 'react';
import '/src/styles/css/App.css'
import { Application } from '@splinetool/runtime';

function App() {
  const canvasRef = useRef(null); // Create a ref to reference the canvas element 
  const [backgroundActive, setBackgroundActive] = useState(false)
  const [sceneLoaed, setSceneLoaded] = useState(false)
  const [areaName, setAreaName] = useState("default")

  useEffect(() => {
    const loadApp = async () => {
      if (canvasRef.current) { // Check if the canvasRef is available
        const app = new Application(canvasRef.current); // Initialize the Spline application with the canvas element
        try {
          await app.load('https://prod.spline.design/gsBeBMWmNSKzvVr9/scene.splinecode');
          setSceneLoaded(true)
          app.addEventListener('mouseDown', (e) => {
            if (e.target.name === "Trigger_to_zoom_in") {
              setBackgroundActive(true)
            }
          });
          app.addEventListener('mouseHover', (e) => {
            setAreaName(e.target.name)
          });
        } catch (error) {
          console.error("Failed to load the Spline scene:", error);
        }
      }
    };
  
    loadApp(); // Call the async function
  }, []); // Empty dependency array means this effect runs once after the initial render
  

  return (
      <div className="App">
        <div className={`background ${backgroundActive ? "active" : ""}`}></div>
        <div className="landing_page_content">
          <h1 className={`hero_title ${backgroundActive ? "hide" : ""}`}>Leviathan<span className='apostroph'>'</span>s Keep</h1>
          <p className={`hero_subtitle ${backgroundActive ? "hide" : ""}`}>humanity<span className='apostroph'>'</span>s last sight</p>
        </div>
        <div className="areas_info">
          <p className="area_name">{areaName}</p>
        </div>
        <canvas style={{opacity: sceneLoaed ? "1" : "0"}} ref={canvasRef} id="canvas3d" />
      </div>
  );
}

export default App;


