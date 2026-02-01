import type { ActivityType } from "../App";
import { useMemo } from "react";
import { sortActivityByDateDesc } from "../utils/sorting";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";

type props = {
  activity: ActivityType[];
};

type logType = "success" | "failure";

const TodayStats = ({ activity }: props) => {
  const sortedActivity = useMemo(
    () => sortActivityByDateDesc(activity),
    [activity],
  );

  const latest = sortedActivity[0];

  const isLoggedToday = useMemo(() => {
    if (!latest) return false;

    const today = new Date().setHours(0, 0, 0, 0);
    const lastDay = new Date(latest.date).setHours(0, 0, 0, 0);

    return today === lastDay;
  }, [latest]);

  const logType: logType = isLoggedToday ? "success" : "failure";

  const lastUpdated = useMemo(() => {
    if (!latest) return "No Activity Logged";

    const today = new Date().setHours(0, 0, 0, 0);
    const lastDay = new Date(latest.date).setHours(0, 0, 0, 0);
    const diff = (today - lastDay) / (1000 * 60 * 60 * 24);

    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff} days ago`;
  }, [latest]);

  const hour = latest ? Number(latest.hour) : 0;
  const min = latest ? Number(latest.minute) : 0;

  return (
    <div
      className="
        mt-6 py-7 px-8 space-y-8
        rounded-xl grid text-xl
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        text-slate-700 dark:text-slate-300
        shadow-sm dark:shadow-none
      "
    >
      <div className="today-stat-card">
        <div className="text-slate-500 dark:text-slate-400">Today</div>
        <div className="flex items-center gap-2 font-semibold">
          {isLoggedToday ? "Logged" : "Not Logged"}
          {logType === "success" ? (
            <FaCheckCircle className="text-green-500 animate-pulse" size={20} />
          ) : (
            <FaTimesCircle className="text-red-500 animate-pulse" size={20} />
          )}
        </div>
      </div>

      <div className="today-stat-card">
        <div className="text-slate-500 dark:text-slate-400">Last updated</div>
        <div className="font-semibold">{lastUpdated}</div>
      </div>

      <div className="today-stat-card">
        <div className="text-slate-500 dark:text-slate-400">Duration</div>
        <div className="font-semibold">
          {sortedActivity.length === 0
            ? "No Duration Logged"
            : `${hour}h ${min}m`}
        </div>
      </div>
    </div>
  );
};

export default TodayStats;
