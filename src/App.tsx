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
import Motivation from "./pages/Motivation";

export type ActivityType = {
  id: number;
  date: string;
  hour: string;
  minute: string;
};

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activity, setActivity] = useState<ActivityType[]>(() => {
    try {
      const saved = localStorage.getItem("activity");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("activity", JSON.stringify(activity));
  }, [activity]);

  const sortedActivity = useMemo(() => {
    return [...activity].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [activity]);

  // streak calculation
  const streak = useMemo(() => {
    if (activity.length === 0) return 0;
    let today = new Date().setHours(0, 0, 0, 0);
    let expectedDate = today;

    let count = 0;
    for (let i = sortedActivity.length - 1; i >= 0; i--) {
      let activityDate = new Date(sortedActivity[i].date).setHours(0, 0, 0, 0);
      let diffInDays = (expectedDate - activityDate) / (1000 * 60 * 60 * 24);

      if (diffInDays === 1 || diffInDays == 0) {
        count++;
        expectedDate = activityDate;
      } else break;
    }
    return count;
  }, [sortedActivity]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-600 overflow-x-hidden">
      <Header streak={streak} />

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
          <Route path="/motivation" element={<Motivation />}/>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
