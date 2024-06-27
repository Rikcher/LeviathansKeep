  import { useState, useEffect, useRef } from 'react';
  import '/src/styles/css/App.css';
  import { Application } from '@splinetool/runtime';
  import useTypewriter from '/src/components/useTypewriter.jsx'; // Adjust the path according to your file structure
  import useScrambleEffect from '/src/components/useScrambleEffect.jsx'; // Adjust the path according to your file structure 
  import TransitionEffect from '/src/components/TransitionEffect.jsx'


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
    const [learnMoreText, setLearnMoreText] = useState("")
    const [imageSwapEffect, setImageSwapEffect] = useState({state: false, imageKey: ""})
    const [showTransitionEffect, setShowTransitionEffect] = useState(false);
    const [id, setId] = useState(null);

    const areaMappings = {
      Forest: {
        text: "Nestled within Leviathan's Keep, Greenwood is a vast, verdant forest. Towering trees and lush undergrowth create a haven of biodiversity with rare plants and elusive wildlife. Ancient wisdom whispers through hidden groves and crystal-clear streams, showcasing nature's timeless beauty and resilience.",
        header: "Greenwood",
        glitchImage: 'forest.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Forest/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Forest/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Forest/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Forest/fourthImage.jpg'
        },
        learnMoreText: "Greenwood, a lush forest nestled within Leviathan's Keep, is renowned for its towering ancient trees and rich biodiversity. Home to countless species, the forest thrives with vibrant flora and fauna, including rare medicinal plants and elusive wildlife. The dense canopy provides a sanctuary for birds and arboreal creatures, while the forest floor, carpeted with moss and ferns, hosts an array of insects and small mammals. Hidden within Greenwood are ancient ruins and mystical groves, suggesting a long-lost civilization once revered this verdant haven. Streams and crystal-clear ponds dot the landscape, adding to the forest's serene and magical ambiance."
      },
      Mountainous_Desert: {
        text: "In Leviathan's Keep, Dune Summit rises as a testament to human adaptation amidst desert mountains. Sleek structures blend seamlessly with rugged landscapes, creating an urban oasis. Amidst ancient peaks and modern marvels, Dune Summit thrives as a center of civilization and technological innovation.",
        header: "Dune Summit",
        glitchImage: 'mountainDesert.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Mountainous_Desert/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Mountainous_Desert/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Mountainous_Desert/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Mountainous_Desert/fourthImage.jpg'
        },
        learnMoreText: "In the heart of Leviathan's Keep, Dune Summit is a vast mountainous desert, characterized by towering sand dunes and rugged peaks. This arid expanse features dramatic rock formations sculpted by relentless winds, creating a breathtaking, otherworldly landscape. Sparse vegetation dots the terrain, adapted to the harsh climate with deep roots and hardy foliage. Despite the challenging environment, diverse wildlife, including desert foxes and hardy reptiles, thrives here. Ancient cave paintings and forgotten ruins hint at past civilizations that once called this desert home, adding a layer of historical intrigue to Dune Summit's stark and majestic beauty."
      },
      Giant_Wall: {
        text: "Within Leviathan's Keep, Bastion Forge stands as a monumental tribute to industrial mastery. Enclosed by an impregnable wall, this fortress-city houses towering smokestacks and intricate machinery. Workshops buzz with innovation, forging advancements that propel humanity forward amidst the echoes of progress.",
        header: "Bastion Forge",
        glitchImage: 'holeInWall.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Giant_Wall/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Giant_Wall/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Giant_Wall/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Giant_Wall/fourthImage.jpg'
        },
        learnMoreText: "Within Leviathan's Keep, Bastion Forge stands as a monumental tribute to industrial mastery. Dominated by an enormous, impregnable wall, this fortress-city safeguards its mechanical marvels and technological advancements. The colossal gates open into a world where towering smokestacks and intricate machinery define the skyline. Workshops and foundries buzz with relentless activity, crafting innovations that drive humanity forward. The wall itself, a marvel of engineering, symbolizes both protection and progress, enclosing a community dedicated to invention and resilience. Amidst the constant clatter of gears and the glow of molten metal, Bastion Forge embodies the relentless spirit of human ingenuity."
      },
      Flat_Desert: {
        text: "Within Leviathan's Keep lies Celestial Steppe, where flatlands extend to the horizon under the glow of distant stars. Advanced settlements with gleaming spires rise from the arid landscape, blending with the celestial backdrop in a testament to human ingenuity reaching towards the cosmos.",
        header: "Celestial Steppe",
        glitchImage: 'flatDesert.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Flat_Desert/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Flat_Desert/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Flat_Desert/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Flat_Desert/fourthImage.jpg'
        },
        learnMoreText: "Within Leviathan's Keep lies Celestial Steppe, a vast flat desert where the earth stretches endlessly to meet the horizon. Bathed in the ethereal glow of distant stars and the shimmering sun, this arid landscape is a blend of stark beauty and serene emptiness. Sparse vegetation clings to life amidst the sandy plains, while occasional mirages dance on the horizon. Advanced human settlements, with their gleaming spires and solar-powered domes, rise from the desert floor, blending seamlessly with the celestial backdrop. In this harmonious expanse, humanity thrives, reaching towards the cosmos while grounded in the timeless sands."
      },
      Mountains: {
        text: "Within Leviathan's Keep, Alpine Enclave is a hidden sanctuary amidst towering peaks. Futuristic structures blend with cascading waterfalls and dense forests, offering refuge amidst mountain grandeur. Trails wind through alpine meadows, showcasing thriving wildlife in high-altitude terrain.",
        header: "Alpine Enclave",
        glitchImage: 'mountain.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Mountains/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Mountains/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Mountains/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Mountains/fourthImage.jpg'
        },
        learnMoreText: "Nestled within Leviathan's Keep, Alpine Enclave stands as a hidden sanctuary amidst towering peaks. Here, mankind has ingeniously integrated futuristic structures with the rugged natural landscape. Cascading waterfalls echo through the valleys, providing a serene backdrop to the enclave's blend of technology and nature. The enclave's architecture harmonizes with its surroundings, utilizing sustainable materials and innovative designs to minimize environmental impact. Trails wind through dense forests and alpine meadows, offering glimpses of diverse wildlife adapted to the high-altitude terrain. Alpine Enclave serves not only as a refuge but also as a testament to the harmonious coexistence of human innovation and the majestic grandeur of the mountains."
      },
      Terra_District: {
        text: "Once a bustling urban center, Nexus now stands silent within Leviathan's Keep. Abandoned and reclaimed by nature, its towering skyscrapers and sprawling complexes evoke tales of a prosperous past now overgrown with vines and obscured by the passage of time.",
        header: "Nexus",
        glitchImage: 'town.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Terra_District/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Terra_District/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Terra_District/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Terra_District/fourthImage.jpg'
        },
        learnMoreText: "Nestled within Leviathan's Keep, Terra District, once known as Nexus, stands as a poignant reminder of humanity's past glory. This urban center, now deserted and eerily silent, was once a bustling hub of activity and innovation. Its towering skyscrapers and sprawling complexes, now overgrown with vines and shrouded in mystery, tell stories of a bygone era. Nature has begun to reclaim what was once hers, with trees growing through cracks in pavement and wildlife finding refuge in the abandoned buildings. Terra District stands as a haunting testament to the impermanence of human endeavors and the resilience of nature reclaiming its place."
      },
      Greenvale_Remnants: {
        text: "Edenburgh, once prosperous, now lies within Leviathan's Keep as Greenvale Remnants. Streets, reclaimed by nature, vanish beneath verdant foliage amidst abandoned buildings. Echoes of past prosperity linger amidst the decay, a testament to nature's relentless reclaiming of human habitation.",
        header: "Edenburgh",
        glitchImage: 'townWithGreens.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Greenvale_Remnants/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Greenvale_Remnants/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Greenvale_Remnants/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Greenvale_Remnants/fourthImage.jpg'
        },
        learnMoreText: "Edenburgh, a once thriving town nestled within Leviathan's Keep, now stands as Greenvale Remnants, a haunting testament to nature's relentless reclamation. Streets that once bustled with life now lie buried beneath layers of lush foliage, reclaiming what was once paved with concrete and stone. Buildings, their facades adorned with creeping vines and moss, evoke a sense of poignant beauty amidst the decay. Amidst the overgrown ruins, echoes of past prosperity whisper through the rustling leaves, a reminder of the resilience of nature and the impermanence of human endeavors. Greenvale Remnants stands as a silent witness to the inexorable passage of time within Leviathan's Keep."
      },
      Floating_Obelisk: {
        text: "Towering in Leviathan's Keep, the Floating Obelisk mesmerizes with its massive, levitating presence amidst desert sands. Its mysterious composition defies explanation, standing as a silent sentinel and symbol of curiosity in the vast expanse.",
        header: "Enigma Spire",
        glitchImage: 'unknownStructer.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Floating_Obelisk/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Floating_Obelisk/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Floating_Obelisk/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Floating_Obelisk/fourthImage.jpg'
        },
        learnMoreText: "Towering in the heart of Leviathan's Keep, the Floating Obelisk mesmerizes all who encounter it. This colossal structure hovers mysteriously above the desert sands, defying gravity with its intricate and seemingly weightless design. Its material composition remains an unsolved puzzle, resisting all attempts at analysis. The obelisk's presence evokes a sense of wonder and intrigue, its silent vigil a testament to ancient technologies or perhaps otherworldly craftsmanship. As it casts its shadow across the barren landscape, the Floating Obelisk stands as a symbol of the unknown, a beacon of curiosity amidst the vast expanse of Leviathan's Keep."
      },
      Monolith_District: {
        text: "Emerging from Leviathan's Keep, Nimbus Citadel veils itself in ethereal fog, embodying a stark testament to brutalist architecture. Within its silent halls, echoes of forgotten epochs murmur softly amidst imposing concrete and steel, a blend of historical ambition and enigmatic allure.",
        header: "Nimbus Citadel",
        glitchImage: 'monolit.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Monolith_District/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Monolith_District/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Monolith_District/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Monolith_District/fourthImage.jpg'
        },
        learnMoreText: "Emerging from the misty plains of Leviathan's Keep, Monolith District reveals the Nimbus Citadel—a stark testament to brutalist architecture. Enshrouded in ethereal fog, its massive structures exude an otherworldly grandeur. Within these silent halls, echoes of forgotten epochs murmur softly, obscured by the perpetual mist. The citadel's imposing facades, constructed from imposing concrete and steel, stand as monuments to a bygone era's ambition and strength. Amidst the eerie atmosphere, visitors can feel the weight of history and the enigmatic allure of Monolith District, where past and present merge in a surreal tableau of architectural mastery and mysterious whispers."
      },
      Frost_Plateau: {
        text: "In Leviathan's Keep, Snowreach Outpost once thrived amidst snow-covered plains and towering mountains. Resilient settlements, testament to human adaptability, dot the serene wintry landscape, contrasting life against the challenging yet breathtaking beauty of Frost Plateau.",
        header: "Snowreach Outpost",
        glitchImage: 'snowPlato.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Frost_Plateau/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Frost_Plateau/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Frost_Plateau/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Frost_Plateau/fourthImage.jpg'
        },
        learnMoreText: "In Leviathan's Keep, Frost Plateau emerges as a starkly beautiful landscape where Snowreach Outpost once stood. This snow-covered expanse, encircled by towering mountains, provides a serene canvas for human settlement amidst the harsh wintry conditions. The outpost, a testament to human adaptability, blends harmoniously with the natural surroundings. Log cabins and sturdy structures dot the plateau, their roofs laden with snow, contrasting against the azure sky. Despite the challenging environment, life flourishes here, as resilient communities thrive amidst the solitude and breathtaking beauty of Frost Plateau, embodying the enduring spirit of human resilience in Leviathan's Keep."
      },
      Snow_Mountains: {
        text: "Deep within Leviathan's Keep's snow-capped mountains, Blizzard Peak Research Facility stands as a beacon of scientific exploration. Amidst pristine snow and rugged peaks, scientists delve into the universe's mysteries, utilizing high-tech laboratories amidst awe-inspiring natural grandeur.",
        header: "Frostpeak Station",
        glitchImage: 'snowMountains.jpg',
        images: {
          firstImage: '/individualArea/areas_images/Snow_Mountains/firstImage.jpg',
          secondImage: '/individualArea/areas_images/Snow_Mountains/secondImage.jpg',
          thirdImage: '/individualArea/areas_images/Snow_Mountains/thirdImage.jpg',
          fourthImage: '/individualArea/areas_images/Snow_Mountains/fourthImage.jpg'
        },
        learnMoreText: "Nestled deep within the snow-capped peaks of Leviathan's Keep, Blizzard Peak Research Facility stands as a bastion of scientific exploration. Amidst the rugged terrain and pristine white snow, this facility embodies a commitment to innovation and discovery. Scientists and researchers from diverse fields converge here, drawn by the allure of unlocking the mysteries of the universe. High-tech laboratories and observatories dot the landscape, their futuristic architecture blending seamlessly with the natural grandeur of the snow mountains. Against the backdrop of towering peaks and endless vistas, Blizzard Peak Research Facility symbolizes humanity's relentless pursuit of knowledge amidst the awe-inspiring beauty of the Snow Mountains."
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
                      setLearnMoreText(areaData.learnMoreText);
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
        setId(id)
        handleStartAnimation()  
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

    const handleStartAnimation = () => {
      setShowTransitionEffect(true);
    };

    const handleAnimationEnd = () => {
      setShowTransitionEffect(false);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
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
        {showTransitionEffect && (
          <TransitionEffect onAnimationEnd={handleAnimationEnd} />
        )}
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
              <div className="informationOverlay">
                <div className="overlayText">{learnMoreText}</div>
              </div>
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
