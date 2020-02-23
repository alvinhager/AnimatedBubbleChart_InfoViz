import { useState, useEffect } from 'react';

// Hook
export default function useTrueAfterTimeout(delay) {
    // State and setters for debounced value
    const [trueAfterTimeout, setTrueAfterTimeout] = useState(false);

    const resetTimer = () => { if (trueAfterTimeout === true) { setTrueAfterTimeout(false) } };


    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setTrueAfterTimeout(true);
            }, delay);

        },
        [delay, trueAfterTimeout] // Only re-call effect if value or delay changes
    );

    return [trueAfterTimeout, resetTimer];
}