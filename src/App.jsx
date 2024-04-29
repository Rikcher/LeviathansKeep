import { useState, useEffect, useRef } from 'react';
import './App.css'
import { Application } from '@splinetool/runtime';

function App() {
  const canvasRef = useRef(null); // Create a ref to reference the canvas element

  useEffect(() => {
      if (canvasRef.current) { // Check if the canvasRef is available
        const app = new Application(canvasRef.current); // Initialize the Spline application with the canvas element
        console.log(app)
        app.load('https://prod.spline.design/gsBeBMWmNSKzvVr9/scene.splinecode')
        .then(() => {
          app.setVariables({test_text: "TEST"})
        }); // Load the Spline scene
      }
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
      <div className="App">
          <canvas ref={canvasRef} id="canvas3d" /> {/* Use the ref here */}
      </div>
  );
}

export default App;


