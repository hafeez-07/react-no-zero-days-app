import { useEffect, useRef } from "react";

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

  // restore on refresh
  useEffect(() => {
    const savedElapsed = localStorage.getItem("sw-elapsed");
    const savedStart = localStorage.getItem("sw-start");
    const savedRunning = localStorage.getItem("sw-running");

    if (savedElapsed) setSeconds(Number(savedElapsed));
    if (savedRunning === "true" && savedStart) {
      startTimeRef.current = Number(savedStart);
      setIsRunning(true);
    }
  }, []);

  // accurate timer
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - (startTimeRef.current ?? Date.now())) / 1000,
      );

      setSeconds(() => {
        const total =
          Number(localStorage.getItem("sw-elapsed") ?? 0) + elapsed;
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
    localStorage.setItem("sw-elapsed", String(seconds));
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

  const format = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="
        mt-12 mx-auto w-[92vw] sm:w-[360px]
        rounded-2xl p-8
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        shadow-lg
      "
    >
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400">
          SESSION TIMER
        </p>
      </div>

      {/* Time */}
      <div className="text-center mb-8">
        <div
          className={`
            text-5xl font-semibold tracking-tight
            text-slate-900 dark:text-slate-100
            ${isRunning ? "animate-pulse" : ""}
          `}
        >
          {format(hour)}:{format(minute)}:{format(second)}
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {isRunning ? "Focus in progress" : "Ready when you are"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={startHandler}
          disabled={isRunning}
          className="
            flex-1 h-11 rounded-xl
            bg-emerald-500 text-white font-semibold
            hover:bg-emerald-400
            disabled:opacity-40
            transition
          "
        >
          Start
        </button>

        <button
          onClick={pauseHandler}
          disabled={!isRunning}
          className="
            flex-1 h-11 rounded-xl
            bg-slate-100 dark:bg-slate-800
            text-slate-700 dark:text-slate-200
            hover:bg-slate-200 dark:hover:bg-slate-700
            disabled:opacity-40
            transition
          "
        >
          Pause
        </button>
      </div>

      <button
        onClick={resetHandler}
        className="
          mt-4 w-full h-10 rounded-xl
          border border-rose-300 dark:border-rose-500/40
          text-rose-600 dark:text-rose-400
          hover:bg-rose-50 dark:hover:bg-rose-500/10
          transition
        "
      >
        Reset
      </button>
    </div>
  );
};

export default StopWatch;
