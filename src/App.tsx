import { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [elapsedTimes, setElapsedTimes] = useState<string[]>([]);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  const formatTime = (time: number) =>
    new Date(time * 1000).toISOString().substr(11, 8);

  const handleStartPause = () => setRunning((val) => !val);

  const handleLap = () => {
    if (time !== 0) setElapsedTimes((times) => [formatTime(time), ...times]);
  };

  const handleStop = () => {
    setRunning(false);
    if (time !== 0) setElapsedTimes((times) => [formatTime(time), ...times]);
    setTime(0);
  };

  const handleReset = () => {
    setTime(0);
    setElapsedTimes([]);
  };

  return (
    <div className="app">
      <h1>Stopwatch</h1>
      <div className="stopwatch-time">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleLap} disabled={!running}>
          Lap
        </button>
        <button onClick={handleStartPause}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {elapsedTimes.length > 0 && (
        <div className="table-container">
          <table className="recorded-times">
            <thead>
              <tr>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {elapsedTimes.map((t, index) => (
                <tr key={`${t}-${index}`}>
                  <td>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
