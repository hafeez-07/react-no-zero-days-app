import { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Activity from "./components/Activity";
import Footer from "./components/Footer";
import StopWatch from "./components/StopWatch";
import "./App.css";
import About from "./pages/About";
import Guide from "./pages/Guide";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { sortActivityByDateDesc } from "./utils/sorting";
import { STORAGE_KEYS } from "./constants/StorageKeys";

export type ActivityType = {
  id: number;
  date: string;
  hour: string;
  minute: string;
};

function App() {
  const [seconds, setSeconds] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const theme =
      (localStorage.getItem(STORAGE_KEYS.THEME) as "light" | "dark") ?? "dark";
    return theme;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [activity, setActivity] = useState<ActivityType[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (activity.length === 0) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVITY);
      localStorage.removeItem(STORAGE_KEYS.LAST_CELEBRATED);
    } else {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activity));
    }
  }, [activity]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const sortedActivity = useMemo(
    () => sortActivityByDateDesc(activity),
    [activity],
  );

  // streak calculation
  const streak = useMemo(() => {
    if (activity.length === 0) return 0;
    let today = new Date().setHours(0, 0, 0, 0);
    let expectedDate = today;
    let count = 0;
    for (let i = 0; i < sortedActivity.length; i++) {
      let activityDate = new Date(sortedActivity[i].date).setHours(0, 0, 0, 0);
      let diffInDays = (expectedDate - activityDate) / (1000 * 60 * 60 * 24);

      if (diffInDays === 1 || diffInDays == 0) {
        count++;
        expectedDate = activityDate;
      } else break;
    }
    return count;
  }, [sortedActivity]);

  useEffect(() => {
    //if the streak is broken , reset the celebration
    if (streak == 0) {
      localStorage.removeItem(STORAGE_KEYS.LAST_CELEBRATED);
      return;
    }
    const lastCelebratedStreak =
      Number(localStorage.getItem(STORAGE_KEYS.LAST_CELEBRATED)) || 0;

    if (streak > 0 && streak % 7 === 0 && streak > lastCelebratedStreak) {
      const timeoutId = setTimeout(() => {
        toast(`🔥 ${streak} day streak. Keep going.`, {
          style: {
            background: "#16a34a",
            color: "#fff",
            fontWeight: "600",
            textAlign: "center",
          },
        });

        localStorage.setItem(STORAGE_KEYS.LAST_CELEBRATED, String(streak));
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [streak]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      <Header streak={streak} theme={theme} toggleTheme={toggleTheme} />
      <Toaster position="top-center" />

      <main className="flex-1 mt-[9vh]">
        <Routes>
          <Route
            path="/"
            element={<Home activity={activity} setActivity={setActivity} />}
          />
          <Route
            path="/dashboard"
            element={<DashBoard activity={activity} />}
          />
          <Route
            path="/activity"
            element={<Activity activity={activity} setActivity={setActivity} />}
          />
          <Route
            path="/timer"
            element={
              <StopWatch
                seconds={seconds}
                setSeconds={setSeconds}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
