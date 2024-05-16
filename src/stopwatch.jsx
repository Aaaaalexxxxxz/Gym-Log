import React, { useState, useEffect } from "react"
import {} from 'firebase/firestore'

const stopwatch = () => {
    const [time, setTime] = useState(0);

    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
          // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
          intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
      }, [isRunning, time]);

    const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = time % 100;

    // Method to start and stop timer
    const startAndStop = () => {
        setIsRunning(!isRunning);
    };
    const resetandfinish = () => {
        setTime(0);
    };

    return (
        <div className="stopwatch-container">
          <p className="stopwatch-time">
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
          </p>
          <div className="stopwatch-buttons">
            <button className="stopwatch-button" onClick={startAndStop}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button className="stopwatch-button" onClick={resetandfinish}>
              Finish
            </button>
          </div>
        </div>
      );
}

export default stopwatch