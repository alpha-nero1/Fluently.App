import React, { useState, useEffect } from 'react';
import { Flex } from '../flex/flex';
import { Txt } from '../txt/Txt';

interface ILoadingTextProps {
  text: string;
}

export const LoadingText: React.FC<ILoadingTextProps> = ({ text }) => {
    const [dots, setDots] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => {
                // Cycle through dots: 1 dot, 2 dots, 3 dots
                if (prevDots.length === 3) {
                return '';
                }
                return prevDots + '.';
            });
        }, 500); // Update every 500ms

        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    return (
        <Flex>
            <Txt>{text}{dots}</Txt>
        </Flex>
    );
};
