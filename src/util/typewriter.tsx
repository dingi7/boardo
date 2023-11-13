
import { useState, useEffect } from 'react';

type TypewriterProps = {
    text: string;
    delay: number;
    infinite?: boolean;
};

export const Typewriter = ({text, delay, infinite} : TypewriterProps): JSX.Element  => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let timeout : NodeJS.Timeout;

        if (currentIndex < text.length) {
            timeout = setTimeout(() => {
                setCurrentText((prevText) => prevText + text[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, delay);
        } else if (infinite) {
            // ADD THIS CHECK
            setCurrentIndex(0);
            setCurrentText('');
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, delay, infinite, text]);

    return <span>{currentText}</span>;
};
