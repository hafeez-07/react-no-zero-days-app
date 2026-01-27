import { useEffect, useRef } from "react";
import "../index.css";

type timerProps = {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

const StopWatch = ({
  seconds,
  setSeconds,
  isRunning,
  setIsRunning,
}: timerProps) => {
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  // 🔁 restore state on refresh (CORRECT)
  useEffect(() => {
    const savedElapsed = localStorage.getItem("sw-elapsed");
    const savedStart = localStorage.getItem("sw-start");
    const savedRunning = localStorage.getItem("sw-running");

    if (savedElapsed) {
      setSeconds(Number(savedElapsed));
    }

    if (savedRunning === "true" && savedStart) {
      startTimeRef.current = Number(savedStart);
      setIsRunning(true);
    }
  }, []);

  // ⏱️ accurate timer (background-safe)
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      const elapsed =
        Math.floor(
          (Date.now() - (startTimeRef.current ?? Date.now())) / 1000
        );

      setSeconds(prev => {
        const total = Number(
          localStorage.getItem("sw-elapsed") ?? 0
        ) + elapsed;

        return total;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const startHandler = () => {
    startTimeRef.current = Date.now();
    localStorage.setItem("sw-start", String(startTimeRef.current));
    localStorage.setItem("sw-running", "true");
    setIsRunning(true);
  };

  const pauseHandler = () => {
    const frozen = seconds;
    localStorage.setItem("sw-elapsed", String(frozen));
    localStorage.setItem("sw-running", "false");
    localStorage.removeItem("sw-start");
    startTimeRef.current = null;
    setIsRunning(false);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setSeconds(0);
    startTimeRef.current = null;
    localStorage.removeItem("sw-elapsed");
    localStorage.removeItem("sw-start");
    localStorage.removeItem("sw-running");
  };

  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  const format = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="border p-2 w-[90vw] sm:w-sm mx-auto mt-10 border-gray-800 bg-slate-800 rounded-2xl">
      <h2
        className="bg-slate-900 rounded-2xl shadow-2xl  text-2xl sm:w-79
      sm:text-4xl text-[#39FF14] font-bold border-2  h-15 sm:h-20 
       mx-auto my-5 p-4 border-black text-center font-mono w-[70vw] "
      >
        {format(hour)} <span className="custom-text"></span> : {format(minute)}{" "}
        <span className="custom-text"></span> : {format(second)}{" "}
        <span className="custom-text"></span>
      </h2>

      <div className="flex justify-center gap-3 mt-4 mb-3 font-semibold">
        <button
          className="bg-emerald-500 text-black rounded-lg p-2 h-10 w-28 hover:bg-emerald-400"
          onClick={startHandler}
          disabled={isRunning}
        >
          Start/resume
        </button>

        <button
          className="bg-slate-700 p-2 text-white rounded-lg h-10 w-28 hover:bg-slate-600"
          onClick={pauseHandler}
          disabled={!isRunning}
        >
          Pause
        </button>

        <button
          className="bg-transparent border border-red-500 text-red-400 hover:bg-red-500/10 rounded-lg px-2 h-10 w-28

"
          onClick={resetHandler}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;