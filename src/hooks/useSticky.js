import { useState, useEffect, useRef } from 'react';
import useDebounce from

// Hook
export default function useSticky(value, minWaitBetweenUpdates) {
    // State and setters for debounced value
    const [stickyValue, setStickyValue] = useState(value);
    const [debouncedValue, setDebouncedValue] = useDebounce(stickyValue, minWaitBetweenUpdates);


    useEffect(
        () => {

            let handler;
            // set to value if first time setting value
            if (!hasBeenSetOnce.current) {
                setStickyValue(value);
                hasBeenSetOnce.current = true;
            }

            else {
                // Update debounced value only after delay
                handler = setTimeout(() => {
                    setStickyValue(value);
                }, minWaitBetweenUpdates);

            }

            return () => {
                if (handler != null || undefined) {
                    clearTimeout(handler);
                }
            };

        },
        [stickyValue, minWaitBetweenUpdates, value] // Only re-call effect if value or delay changes
    );

    return stickyValue;

}