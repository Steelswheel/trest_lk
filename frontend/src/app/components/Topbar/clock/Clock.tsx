import { useEffect, useState } from 'react';

export function Clock({showSeconds = false}: {showSeconds?: boolean}) {
    const [time, setTime] = useState<Date>(new Date());
    const [timeInterval, setTimeInterval] = useState<any>();

    useEffect(() => {
        const handler = setInterval(() => {
            setTime(new Date());
        }, 1000);

        setTimeInterval(handler);

        return () => {
            clearInterval(timeInterval);
            setTimeInterval(undefined);
        };
    }, []);

    function addNull(value: number): string | number {
        if (value < 10) {
            return `0${value}`;
        }

        return value;
    }

    return (
        <div className="clock">
            {`${addNull(time.getHours())}:${addNull(time.getMinutes())}${showSeconds ? ':' + addNull(time.getSeconds()) : ''}`}
        </div>
    );
}