import { useState, useEffect } from 'react';

const useTypewriter = (text, speed) => {
    const [state, setState] = useState('');

    useEffect(() => {
    setState(''); // Reset the state to empty string when text changes

    const timer = setInterval(() => {
        setState((prev) => {
        if (prev.length < text.length) {
            return prev + text.charAt(prev.length);
        } else {
            clearInterval(timer);
            return prev;
        }
        });
    }, speed);

    return () => clearInterval(timer);
    }, [text, speed]);

    return state;
};

export default useTypewriter;
