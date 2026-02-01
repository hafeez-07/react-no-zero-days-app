import type { ActivityType } from "../App";
import { useMemo } from "react";
import { sortActivityByDateDesc } from "../utils/sorting";
import {
  FaFire,
  FaClock,
  FaChartLine,
  FaCalendarDay,
  FaBolt,
  FaCheckCircle,
  FaTimesCircle,
  FaPercent,
} from "react-icons/fa";

type props = {
  activity: ActivityType[];
};

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

  const sortedActivity = useMemo(
    () => sortActivityByDateDesc(activity),
    [activity],
  );

  const diffInDays = useMemo(() => {
    if (sortedActivity.length === 0) return 0;

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
  const consistency =
    activity.length === 0 ? 100 : Math.floor((activeDays / diffInDays) * 100);

  const getLongestStreak = () => {
    if (activity.length === 0) return 0;

    let streak = 1,
      maxStreak = 1;

    for (let i = 1; i < sortedActivity.length; i++) {
      const prevDate = new Date(sortedActivity[i].date).getTime();
      const curDate = new Date(sortedActivity[i - 1].date).getTime();
      const difference = (curDate - prevDate) / (1000 * 60 * 60 * 24);

      if (difference === 1) {
        streak++;
        maxStreak = Math.max(streak, maxStreak);
      } else {
        streak = 1;
      }
    }
    return maxStreak;
  };

  const longestStreak = getLongestStreak();

  // return (
  //   <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">

  //     <div className="stat-card border-amber-400/30">

  //       <p className="stat-value text-amber-500">{longestStreak}🔥</p>
  //       <p className="stat-label">Longest Streak</p>
  //     </div>

  //     <div className="stat-card border-emerald-400/30">
  //       <p className="stat-value text-emerald-500">
  //         {totalHours}h {totalRemainingMinutes}m
  //       </p>
  //       <p className="stat-label">Total Hours</p>
  //     </div>

  //     <div className="stat-card border-sky-400/30">
  //       <p className="stat-value text-sky-500">
  //         {avgHours}h {remainingAvgMinutes}m
  //       </p>
  //       <p className="stat-label">Avg / Day</p>
  //     </div>

  //     <div className="stat-card border-violet-400/30">
  //       <p className="stat-value text-violet-500 text-lg">
  //         {bestDay ?? "No Data"}
  //       </p>
  //       <p className="stat-label">Best Day</p>
  //     </div>

  //     <div className="stat-card border-rose-400/30">
  //       <p className="stat-value text-rose-500">
  //         {maxHour}h {remainingMaxMinute}m
  //       </p>
  //       <p className="stat-label">Max Day</p>
  //     </div>

  //     <div className="stat-card border-green-400/30">
  //       <p className="stat-value text-green-500">{activeDays}</p>
  //       <p className="stat-label">Active Days</p>
  //     </div>

  //     <div className="stat-card border-slate-400/30">
  //       <p className="stat-value text-slate-500 dark:text-slate-300">
  //         {missedDays}
  //       </p>
  //       <p className="stat-label">Missed Days</p>
  //     </div>

  //     <div className="stat-card border-cyan-400/30 ">
  //       <p className="stat-value text-cyan-500 ">{consistency}%</p>
  //       <p className="stat-label">Consistency</p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center mt-6">
      <div className="stat-card border-amber-400/30">
        <FaFire className="text-amber-400/80 text-sm mb-1" />
        <p className="stat-label">Longest Streak</p>
        <p className="stat-value text-amber-500">{longestStreak}</p>
      </div>

      <div className="stat-card border-emerald-400/30">
        <FaClock className="text-emerald-400/80 text-sm mb-1" />
        <p className="stat-label">Total Hours</p>
        <p className="stat-value text-emerald-500">
          {totalHours}h {totalRemainingMinutes}m
        </p>
      </div>

      <div className="stat-card border-sky-400/30">
        <FaChartLine className="text-sky-400/80 text-sm mb-1" />
        <p className="stat-label">Avg / Day</p>
        <p className="stat-value text-sky-500">
          {avgHours}h {remainingAvgMinutes}m
        </p>
      </div>

      <div className="stat-card border-violet-400/30">
        <FaCalendarDay className="text-violet-400/80 text-sm mb-1" />
        <p className="stat-label">Best Day</p>
        <p className="stat-value text-violet-500 text-lg">
          {bestDay ?? "No Data"}
        </p>
      </div>

      <div className="stat-card border-rose-400/30">
        <FaBolt className="text-rose-400/80 text-sm mb-1" />
        <p className="stat-label">Max Day</p>
        <p className="stat-value text-rose-500">
          {maxHour}h {remainingMaxMinute}m
        </p>
      </div>

      <div className="stat-card border-green-400/30">
        <FaCheckCircle className="text-green-400/80 text-sm mb-1" />
        <p className="stat-label">Active Days</p>
        <p className="stat-value text-green-500">{activeDays}</p>
      </div>

      <div className="stat-card border-slate-400/30">
        <FaTimesCircle className="text-slate-400/80 text-sm mb-1" />
        <p className="stat-label">Missed Days</p>
        <p className="stat-value text-slate-500 dark:text-slate-300">
          {missedDays}
        </p>
      </div>

      <div className="stat-card border-cyan-400/30">
        <FaPercent className="text-cyan-400/80 text-sm mb-1" />
        <p className="stat-label">Consistency</p>
        <p className="stat-value text-cyan-500">{consistency}%</p>
      </div>
    </div>
  );
}
export default DashBoard;
