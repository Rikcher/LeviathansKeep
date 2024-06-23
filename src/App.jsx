  import { useState, useEffect, useRef } from 'react';
  import '/src/styles/css/App.css';
  import { Application } from '@splinetool/runtime';
  import useTypewriter from '/src/components/useTypewriter.jsx'; // Adjust the path according to your file structure
  import useScrambleEffect from '/src/components/useScrambleEffect.jsx'; // Adjust the path according to your file structure


  function App() {
    const canvasRef = useRef(null);
    const appRef = useRef(null); // Reference to store the Spline application instance
    const [backgroundActive, setBackgroundActive] = useState(false);
    const [sceneLoaded, setSceneLoaded] = useState(false);
    const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
    const [fontLoaded, setFontLoaded] = useState(false);
    const [areaName, setAreaName] = useState("default");
    const [hoverActive, setHoverActive] = useState(false);
    const [leftPanelText, setLeftPanelText] = useState("Humanity sought refuge on Leviathan's Keep, a sprawling planet with towering structures, escaping Earth's decline. However, their existence was short-lived as an insidious virus decimated their population, rendering the planet barren once more.");
    const [leftPanelHeader, setLeftPanelHeader] = useState("Leviathan's Keep")
    const [glitchImage, setGlitchImage] = useState('firstImage.jpg');
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const [selectedArea, setSelectedArea] = useState(null); // New state to track the selected area
    const [areaImages, setAreaImages] = useState({firstImage: '', secondImage: '', thirdImage: '', fourthImage: ''});
    const [imageSwapEffect, setImageSwapEffect] = useState({state: false, imageKey: ""})
    const [transitionTriggered, setTransitionTriggered] = useState(false);

    const areaMappings = {
      Forest: {
        text: "Nestled within Leviathan's Keep lay Greenwood, a vast expanse of verdant forest. Towering trees and lush undergrowth created a haven of biodiversity, where life flourished in abundance. Amidst the tranquil surroundings, the forest whispered secrets of ancient wisdom and timeless beauty.",
        header: "Greenwood",
        glitchImage: 'forest.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Forest/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Forest/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Forest/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Forest/fourthImage.jpg'
        }
      },
      Mountainous_Desert: {
        text: "In the heart of Leviathan's Keep, Dune Summit stood as a testament to human adaptation. Its sleek structures blended seamlessly with the rugged landscape, creating an urban oasis amidst the desert mountains. Here, amidst ancient peaks and modern marvels, civilization endured.",
        header: "Dune Summit",
        glitchImage: 'mountainDesert.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Mountainous_Desert/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Mountainous_Desert/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Mountainous_Desert/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Mountainous_Desert/fourthImage.jpg'
        }
      },
      Giant_Wall: {
        text: "Within Leviathan's Keep, Bastion Forge thrived—a testament to industrial prowess. Its entrance, a gaping void, led to a realm of mechanical wonder. Here, amidst the towering ramparts, humanity's ingenuity shaped the future, forging innovations amidst the echoes of progress and the relentless hum of machinery.",
        header: "Bastion Forge",
        glitchImage: 'holeInWall.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Giant_Wall/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Giant_Wall/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Giant_Wall/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Giant_Wall/fourthImage.jpg'
        }
      },
      Flat_Desert: {
        text: "Within Leviathan's Keep lies Celestial Steppe, a realm where the earth meets the heavens in seamless harmony. Here, the flatlands extend to the horizon, bathed in the ethereal glow of distant stars. Amidst this celestial expanse, humanity's advanced settlements flourish, their gleaming spires reaching towards the cosmos.",
        header: "Celestial Steppe",
        glitchImage: 'flatDesert.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Flat_Desert/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Flat_Desert/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Flat_Desert/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Flat_Desert/fourthImage.jpg'
        }
      },
      Mountains: {
        text: "Nestled within Leviathan's Keep, Alpine Enclave was a hidden sanctuary where mankind had carved its refuge into the heart of towering peaks. Amidst rugged cliffs and cascading waterfalls, futuristic structures melded seamlessly with the natural landscape, a testament to human ingenuity amidst the grandeur of the mountains.",
        header: "Alpine Enclave",
        glitchImage: 'mountain.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Mountains/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Mountains/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Mountains/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Mountains/fourthImage.jpg'
        }
      },
      Terra_District: {
        text: "Nestled within Leviathan's Keep, Nexus was once a bustling urban center. Now, devoid of humanity, its structures stand silent and abandoned, gradually succumbing to the passage of time.",
        header: "Nexus",
        glitchImage: 'town.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Terra_District/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Terra_District/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Terra_District/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Terra_District/fourthImage.jpg'
        }
      },
      Greenvale_Remnants: {
        text: "Edenburgh, once a prosperous town, now lies within Leviathan's Keep, consumed by nature's grasp. Streets, once bustling, now vanish beneath layers of verdant foliage, succumbing to the relentless advance of the wilderness.",
        header: "Edenburgh",
        glitchImage: 'townWithGreens.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Greenvale_Remnants/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Greenvale_Remnants/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Greenvale_Remnants/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Greenvale_Remnants/fourthImage.jpg'
        }
      },
      Floating_Obelisk: {
        text: "Towering in the heart of Leviathan's Keep, the Enigma Spire perplexes all who behold it. This massive levitating structure, its composition a mystery, defies explanation amidst the desert sands. Its presence, an enigma shrouded in secrecy, stands as a silent sentinel in the vast expanse.",
        header: "Enigma Spire",
        glitchImage: 'unknownStructer.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Floating_Obelisk/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Floating_Obelisk/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Floating_Obelisk/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Floating_Obelisk/fourthImage.jpg'
        }
      },
      Monolith_District: {
        text: "Rising from the misty plains of Leviathan's Keep, the Nimbus Citadel stood as a monument to brutalist architecture. Its massive structures, veiled in ethereal fog, evoked an aura of otherworldly grandeur. Within its silent halls, whispers of forgotten epochs echoed, obscured by the ever-present mist.",
        header: "Nimbus Citadel",
        glitchImage: 'monolit.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Monolith_District/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Monolith_District/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Monolith_District/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Monolith_District/fourthImage.jpg'
        }
      },
      Frost_Plateau: {
        text: "In Leviathan's Keep, Snowreach Outpost stood amidst snow-covered plains. Surrounded by mountains, the flat expanse offered a canvas for human habitation. Amidst the wintry setting, settlements thrived, their presence a testament to human adaptability and resilience.",
        header: "Snowreach Outpost",
        glitchImage: 'snowPlato.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Frost_Plateau/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Frost_Plateau/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Frost_Plateau/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Frost_Plateau/fourthImage.jpg'
        }
      },
      Snow_Mountains: {
        text: "Deep within the snow-capped mountains of Leviathan's Keep, the Blizzard Peak Research Facility stood as a bastion of scientific inquiry. Amidst the towering peaks and pristine snow, this facility was a beacon of innovation and discovery, where researchers delved into the mysteries of universe, seeking to unlock its secrets..",
        header: "Frostpeak Station",
        glitchImage: 'snowMountains.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Snow_Mountains/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Snow_Mountains/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Snow_Mountains/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Snow_Mountains/fourthImage.jpg'
        }
      },
    };
    


    const scrambleRef = useScrambleEffect(leftPanelHeader);
    const glitchWrapperRef = useRef(null);


    useEffect(() => {
      const loadFont = async () => {
        try {
          const font = new FontFace('nasafont', 'url(/assets/font/nasalization-rg.woff2)');
          await font.load();
          document.fonts.add(font);
          setFontLoaded(true);
        } catch (error) {
          console.error("Failed to load the font:", error);
        }
      };
    
      loadFont();
    }, []);
    useEffect(() => {
      const img = new Image();
      img.src = '/planetInteraction/SiteBackground.png';
      img.onload = () => setBackgroundImageLoaded(true);
      img.onerror = (error) => {
        console.error("Failed to load the background image:", error);
      };
    }, []);
    useEffect(() => {
      if (sceneLoaded && glitchWrapperRef.current) {
        glitchWrapperRef.current.classList.add('hide');
        glitchWrapperRef.current.addEventListener('transitionend', () => {
          glitchWrapperRef.current.style.display = 'none';
        }, { once: true });
      }
    }, [sceneLoaded]);

    useEffect(() => {
      const loadApp = async () => {
        if (canvasRef.current && !appRef.current) { // Initialize only if not already initialized
          const app = new Application(canvasRef.current);
          appRef.current = app; // Store the instance in the ref
    
          try {
            await app.load('https://prod.spline.design/gsBeBMWmNSKzvVr9/scene.splinecode');
    
            app.addEventListener('mouseDown', (e) => {
              if (e.target.name === "Trigger_to_zoom_in") {
                setBackgroundActive(true);
              } else if (e.target.name.startsWith('hover_')) {
                const areaKey = e.target.name.substring(6).replace(/_/g, '_'); // Extract the area name (e.g., "Forest", "MountainDesert")
            
                setSelectedArea((prevSelectedArea) => {
                  if (areaKey !== prevSelectedArea) {
                    const areaData = areaMappings[areaKey];
            
                    if (areaData) {
                      setLeftPanelText(areaData.text);
                      setLeftPanelHeader(areaData.header);
                      setAnimationTriggered(true);
            
                      setTimeout(() => {
                        setGlitchImage(areaData.glitchImage);
                        setAnimationTriggered(false);
                      }, 3000);

                      setAreaImages(areaData.images);
                      console.log(areaImages)
                    }
            
                    return areaKey; // Update the selected area
                  }
            
                  return prevSelectedArea; // If the area is the same, return the previous state
                });
              }
            });
    
            app.addEventListener('mouseHover', (e) => {
              if (e.target.name.startsWith('hover_')) {
                setHoverActive(true);
                const areaName = e.target.name.substring(6).replace(/_/g, ' ');
                setAreaName(areaName);
              } else {
                setHoverActive(false);
                setAreaName("");
              }
            });

            // Check if all assets are loaded
            if (backgroundImageLoaded && fontLoaded) {
              setSceneLoaded(true);
            }

          } catch (error) {
            console.error("Failed to load the Spline scene:", error);
          }
        }
      };
    
      loadApp();
    
      return () => {
        if (appRef.current) {
          appRef.current.dispose(); // Cleanup the Spline instance if the component unmounts
          appRef.current = null; // Clear the ref
        }
      };
    }, [backgroundImageLoaded, fontLoaded]);

    const handleScroll = (id) => {
      if(selectedArea) {
        const element = document.getElementById(id);
        setTimeout(() => {
          if (element) {
            element.scrollIntoView();
          }
        }, 500)
        setTransitionTriggered(true)
        setTimeout(() => {
          setTransitionTriggered(false);
        }, 1600)
      }
    };

    const swapImages = (clickedImageKey) => {
      setAreaImages((prevAreaImages) => {
        const updatedAreaImages = { ...prevAreaImages };
        const temp = updatedAreaImages.firstImage;
        updatedAreaImages.firstImage = updatedAreaImages[clickedImageKey];
        updatedAreaImages[clickedImageKey] = temp;
        setImageSwapEffect({state: true, imageKey: clickedImageKey})
        setTimeout(() => {
          setImageSwapEffect(false)
        }, 310)
        return updatedAreaImages;
      });
    };
    
    

    return (
      <div className="App">
        <div ref={glitchWrapperRef} className="glitch-wrapper">
          <div className="glitch" data-glitch="LOADING...">LOADING...</div>
        </div>
        <div id="planetInteraction" draggable="false">
          <div className={`background ${backgroundActive ? "active" : ""}`}></div>
          <div className="landing_page_content">
            <h1 className={`hero_title ${sceneLoaded ? "show" : ""} ${backgroundActive ? "hide" : ""}`}>Leviathan<span className='apostroph'>'</span>s Keep</h1>
            <p className={`hero_subtitle ${sceneLoaded ? "show" : ""} ${backgroundActive ? "hide" : ""}`}>humanity<span className='apostroph'>'</span>s last sight</p>
          </div>
          <div className={`hoverEffect ${hoverActive ? "show" : ""}`}>
            <img draggable="false" src="/planetInteraction/hoverEffect.svg" alt="" />
            <div className="nameOfArea">
              <img src="/planetInteraction/areaNameBox.svg" alt="" />
              <div id="hoverTextBox">
                <p>{areaName}</p>
              </div>
            </div>
          </div>
          <div className={`panelsWrapper ${backgroundActive ? "show" : ""}`}>
            <div className="leftPanel">
              <img draggable="false" src="/planetInteraction/leftPanel.svg" alt="" />
              <h2 id="leftPanelHeader" ref={scrambleRef}>{leftPanelHeader}</h2>
              <p id="leftPanelText">{useTypewriter(leftPanelText ,10)}</p>
              <div className="movingLine">
                <div className="movingPart"></div>
              </div>
            </div>
            <div className="rightPanel">
              <img draggable="false" src="/planetInteraction/rightPanel.svg" alt="" />
              <div className={`imageGlitch ${animationTriggered ? "switch" : ""}`} data-text="" style={{background: `url(/planetInteraction/${glitchImage}) center/cover no-repeat`}}>
                <div className={`glitchOverlay glitchOverlay1 ${animationTriggered ? "switch" : ""}`} style={{background: `url(/planetInteraction/${glitchImage}) center/cover no-repeat`}}>
                </div>
                <div className={`glitchOverlay glitchOverlay2 ${animationTriggered ? "switch" : ""}`} style={{background: `url(/planetInteraction/${glitchImage}) center/cover no-repeat`}}>
                </div>
              </div>
              <div className="loopingAnimation">
                <div className="roatatingPart"></div>
              </div>
            </div>
            <div className="graph">
              <img draggable="false" src="/planetInteraction/graph.svg" alt="" />
              <svg className='lines' width="50" height="50" viewBox="0 -30 50 50" xmlns="http://www.w3.org/2000/svg">
                <path className="path-transition" d={"M 8 9 H 14 V 1 H 8 V 9 M 22 9 H 28 V -18 H 22 V 9 M 36 9 H 42 V -25 H 36 V 9"} fill="white" stroke="white" strokeWidth="2" />
              </svg>
              <div className="lineWrapper">
                <img src="/planetInteraction/line.svg" alt="" className="line" />
                <img src="/planetInteraction/line.svg" alt="" className="line" />
              </div>
            </div>
            <div className="learnMoreButton" onClick={() => handleScroll('individualArea')}>
              <img draggable="false" src="/planetInteraction/learnMoreButton.svg" alt="" />
              <div className="buttonSlide">
                <img src="/planetInteraction/buttonSlide.svg" alt="" />
                <div className="learnMoreTextSlideWrapper">
                  <p id="learnMoreButtonTextSlide">Learn More</p>
                </div>
              </div>
              <div className="learnMoreTextWrapper">
                <p id="learnMoreButtonText">Learn More</p>
              </div>
            </div>
          </div>
          <canvas className={`${hoverActive ? "show" : ""}`} style={{ opacity: sceneLoaded ? "1" : "0"}} ref={canvasRef} id="canvas3d"/>
        </div>
        <div className={`transitionEffect ${transitionTriggered ? "animate" : ""}`}>
          <div className="part part1"></div>
          <div className="part part2"></div>
          <div className="part part3"></div>
          <div className="part part4"></div>
        </div>
        <div id='individualArea'>
          <div className="goBackButton" onClick={() => handleScroll('planetInteraction')}>
            <img draggable="false" src="/individualArea/goBackButton.svg" alt="" />
            <div className="buttonSlide">
              <img src="/individualArea/buttonSlide.svg" alt="" />
              <div className="learnMoreTextSlideWrapper">
                <p id="learnMoreButtonTextSlide">Go Back</p>
              </div>
            </div>
            <div className="learnMoreTextWrapper">
              <p id="learnMoreButtonText">Go Back</p>
            </div>
          </div>
          <div className="cubesMask">
            <div className="cubesAnimation"></div>
          </div>
          <div className="firstImage">
            <div className="firstImageMask" style={{background: `url(${areaImages.firstImage}) center/cover no-repeat`}}>
              <div className={`swapEffect ${imageSwapEffect.state ? "active" : ""}`}></div>
              <div className="informationOverlay"></div>
            </div>
            <img src="/individualArea/firstImageOverlay.svg" alt="" className="firstImageOverlay" />
          </div>
          <div className="secondImage" onClick={() => swapImages('secondImage')}>
            <div className="secondImageMask" style={{background: `url(${areaImages.secondImage}) center/cover no-repeat`}}>
              <div className={`swapEffect ${imageSwapEffect.state && imageSwapEffect.imageKey === 'secondImage' ? "active" : ""}`}></div>
            </div>
            <img src="/individualArea/secondImageBorder.svg" alt="" className="secondImageBorder" />
            <div className="secondImageOverlay"></div>
          </div>
          <div className="thirdImage" onClick={() => swapImages('thirdImage')}>
            <div className="thirdImageMask" style={{background: `url(${areaImages.thirdImage}) center/cover no-repeat`}}>
              <div className={`swapEffect ${imageSwapEffect.state && imageSwapEffect.imageKey === 'thirdImage' ? "active" : ""}`}></div>
            </div>
            <img src="/individualArea/thirdImageBorder.svg" alt="" className="thirdImageBorder" />
            <div className="thirdImageOverlay"></div>
          </div>
          <div className="fourthImage" onClick={() => swapImages('fourthImage')}>
            <div className="fourthImageMask" style={{background: `url(${areaImages.fourthImage}) center/cover no-repeat`}}>
              <div className={`swapEffect ${imageSwapEffect.state && imageSwapEffect.imageKey === 'fourthImage' ? "active" : ""}`}></div>
            </div>
            <img src="/individualArea/fourthImageBorder.svg" alt="" className="fourthImageBorder" />
            <div className="fourthImageOverlay"></div>
          </div>
        </div>
      </div>
    );
  }

  export default App;
