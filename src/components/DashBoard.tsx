import type { ActivityType } from "../App";

type props = {
  activity: ActivityType[];
};

import { useMemo } from "react";
import { sortActivityByDateDesc } from "../utils/sorting";

function DashBoard({ activity }: props) {
  const totalMinutes = activity.reduce(
    (sum, a) => sum + Number(a.hour) * 60 + Number(a.minute),
    0,
  );

  const totalHours = Math.floor(totalMinutes / 60);
  const totalRemainingMinutes = totalMinutes % 60;

  const activeDays = activity.length;

  const avgMinutes =
    activeDays === 0 ? 0 : Math.floor(totalMinutes / activeDays);
  const avgHours = Math.floor(avgMinutes / 60);
  const remainingAvgMinutes = avgMinutes % 60;

  const sortedActivity = useMemo(() => {
    return sortActivityByDateDesc(activity);
  }, [activity]);

  
  const diffInDays = useMemo(() => {
    if (sortedActivity.length === 0) return 1;

    const startDate = new Date(
      sortedActivity[sortedActivity.length - 1].date,
    ).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    return Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
  }, [sortedActivity]);

  const bestDayData = useMemo(() => {
    if (activity.length === 0) {
      return {
        bestDay: null,
        maxHour: 0,
        remainingMaxMinute: 0,
      };
    }

    let maxTime = Number(activity[0].hour) * 60 + Number(activity[0].minute);
    let bestDay = activity[0].date;

    for (let i = 1; i < activity.length; i++) {
      const currentTime =
        Number(activity[i].hour) * 60 + Number(activity[i].minute);

      if (currentTime > maxTime) {
        maxTime = currentTime;
        bestDay = activity[i].date;
      }
    }

    return {
      bestDay,
      maxHour: Math.floor(maxTime / 60),
      remainingMaxMinute: maxTime % 60,
    };
  }, [activity]);

  const { bestDay, maxHour, remainingMaxMinute } = bestDayData;

  const missedDays = Math.max(0, diffInDays - activeDays);
  const consistency = Math.floor((activeDays / diffInDays) * 100);

  const getLongestStreak = () => {
    if (activity.length == 0) {
      return 0;
    }
    let streak = 1,
      maxStreak = 1;
    for (let i = 1; i < sortedActivity.length; i++) {
      let prevDate = new Date(sortedActivity[i].date).getTime();
      let curDate = new Date(sortedActivity[i - 1].date).getTime();
      const difference = (curDate - prevDate) / (1000 * 60 * 60 * 24);
      if (difference == 1) {
        streak++;
        maxStreak = Math.max(streak, maxStreak);
      } else {
        streak = 1;
      }
    }
    return maxStreak;
  };

  const longestStreak = getLongestStreak();

  return (
    <div className=" mt-6 w-full  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center  ">
      <div className="stat-card border-amber-400/40">
        <p className="stat-value text-amber-400">{longestStreak}</p>
        <p className="stat-label">Longest Streak</p>
      </div>

      <div className="stat-card border-emerald-400/40">
        <p className="stat-value text-emerald-400">
          {totalHours}h {totalRemainingMinutes}m
        </p>
        <p className="stat-label">Total Hours</p>
      </div>

      <div className="stat-card border-sky-400/40">
        <p className="stat-value text-sky-400">
          {avgHours}h {remainingAvgMinutes}m
        </p>
        <p className="stat-label">Avg / Day</p>
      </div>

      <div className="stat-card border-violet-400/40">
        <p className="stat-value text-violet-400 text-lg">
          {bestDay ?? "No Data"}
        </p>
        <p className="stat-label">Best Day</p>
      </div>

      <div className="stat-card border-rose-400/40">
        <p className="stat-value text-rose-400">
          {maxHour}h {remainingMaxMinute}m
        </p>
        <p className="stat-label">Max Day</p>
      </div>

      <div className="stat-card border-green-400/40">
        <p className="stat-value text-green-400">{activeDays}</p>
        <p className="stat-label">Active Days</p>
      </div>

      <div className="stat-card border-slate-400/40">
        <p className="stat-value text-slate-300">{missedDays}</p>
        <p className="stat-label">Missed Days</p>
      </div>

      <div className="stat-card border-cyan-400/40">
        <p className="stat-value text-cyan-400">{consistency}%</p>
        <p className="stat-label">Consistency</p>
      </div>
    </div>
  );
}

export default DashBoard;
