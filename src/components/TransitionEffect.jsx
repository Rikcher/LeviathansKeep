import React, { useEffect, useRef, useState } from 'react';

const TransitionEffect = ({ onAnimationEnd }) => {
    const canvasRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false); // State to manage visibility

    useEffect(() => {
        // Function to animate opacity from 0 to 1
        const fadeIn = () => {
            setIsVisible(true); // Set visible to trigger CSS transition

            // After 300ms (0.3s), start the animation logic
            setTimeout(() => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const rectangles = [];
                let rectanglesShown = 0;
                const maxRectangles = 200;
                const animationDuration = 1000; // Animation duration in milliseconds

                // Calculate rectangles per second
                const rectanglesPerSecond = maxRectangles / (animationDuration / 1000);

                const createRectangle = () => {
                    if (rectanglesShown >= maxRectangles) return;

                    rectanglesShown++;

                    const rect = {
                        x: Math.random() * (canvas.width - 200),
                        y: Math.random() * (canvas.height - 2),
                        width: Math.random() * (150) + 50,
                        height: 2,
                        color: Math.random() < 0.5 ? 'rgba(139, 0, 0, 0.9)' : 'rgba(0, 255, 255, 0.3)',
                        opacity: 1 // Initialize opacity
                    };

                    rectangles.push(rect);

                    setTimeout(() => {
                        rect.opacity = 0;
                        setTimeout(() => {
                            rectangles.shift();
                        }, 100);
                    }, 100);
                };

                const draw = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    rectangles.forEach((rect) => {
                        ctx.fillStyle = rect.color.replace('0.2', rect.opacity);
                        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
                    });
                };

                let animationStartTime = null;

                const animate = (timestamp) => {
                    if (!animationStartTime) {
                        animationStartTime = timestamp;
                    }

                    const elapsedTime = timestamp - animationStartTime;
                    const progress = elapsedTime * rectanglesPerSecond / 1000; // Calculate progress

                    while (rectanglesShown < progress && rectanglesShown < maxRectangles) {
                        createRectangle();
                    }

                    draw();

                    if (rectanglesShown < maxRectangles) {
                        requestAnimationFrame(animate);
                    } else {
                        onAnimationEnd(); // Call the onAnimationEnd callback when animation completes
                    }
                };

                requestAnimationFrame(animate);

            }, 300); // Wait for CSS transition to complete before starting animation
        };

        fadeIn(); // Start the fadeIn effect when component mounts

        return () => {
            // Cleanup logic if needed
        };
    }, [onAnimationEnd]);

    return (
        <canvas
            id="transitionEffect"
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            className={isVisible ? 'visible' : ''} // Apply CSS class based on visibility state
        ></canvas>
    );
};

export default TransitionEffect;
