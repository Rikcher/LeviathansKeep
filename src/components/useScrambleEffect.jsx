import { useEffect, useRef } from 'react';

const useScrambleEffect = (text, duration = 30) => {
    const elementRef = useRef(null);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;

    useEffect(() => {
        if (!elementRef.current) return;

        const targetText = text; // Use targetText to hold the current text value
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
        if (!elementRef.current) return;

        elementRef.current.innerText = targetText
            .split("")
            .map((letter, index) => {
            if (index < iteration) {
                return targetText[index];
            }

            return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iteration >= targetText.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
        }, duration);

        return () => clearInterval(interval);
    }, [text, duration]); // Ensure the effect runs again when 'text' changes

    return elementRef;
};

export default useScrambleEffect;
