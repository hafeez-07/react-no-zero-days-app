import { useEffect } from "react";
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
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, setSeconds]);

  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  const startHandler = () => setIsRunning(true);

  const pauseHandler = () => setIsRunning(false);

  const resetHandler = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const format = (num: number) => String(num).padStart(2, "0"); //funct to return hr:min:sec
  //   in 00:00:00 format
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
