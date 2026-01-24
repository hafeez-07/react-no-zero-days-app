import type { ActivityType } from "../App";
import { useMemo } from "react";
import { sortActivityByDateDesc } from "../utils/sorting";
import { FaTimesCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

type props = {
  activity: ActivityType[];
};

type logType = "success" | "failure";

const TodayStats = ({ activity }: props) => {
  const sortedActivity = useMemo(
    () => sortActivityByDateDesc(activity),
    [activity],
  );

  const latest = sortedActivity[0]; // MOST RECENT

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
    <div className="bg-slate-800 border  border-slate-700 rounded-xl p-6 mt-6 space-y-10 text-slate-300 text-xl  grid ">
      <div className="today-stat-card">
        <div>Today</div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {isLoggedToday ? "Logged " : "Not Logged "}
          </span>
          <span>
            {logType === "success" ? (
              <FaCheckCircle size={20} className="text-green-400 animate-pulse" />
            ) : (
              <FaTimesCircle size={20} className="text-red-400 animate-pulse"/>
            )}
          </span>
        </div>
      </div>
      <div className="today-stat-card">
        <div>Last updated </div>

        <div className="font-semibold">{lastUpdated}</div>
      </div>
      <div className="today-stat-card">
        <div>Duration </div>

        <div className="font-semibold">
          {sortedActivity.length == 0
            ? "No Duration Logged "
            : `${hour}h ${min}m`}
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default TodayStats;
