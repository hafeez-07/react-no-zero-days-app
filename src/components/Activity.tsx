import React, { useMemo } from "react";
import type { ActivityType } from "../App";
import { sortActivityByDateDesc } from "../utils/sorting";

export type ActivityProps = {
  activity: ActivityType[];
  setActivity: React.Dispatch<React.SetStateAction<ActivityType[]>>;
};

function Activity({ activity, setActivity }: ActivityProps) {
  const sortedActivity = useMemo(() => {
    return sortActivityByDateDesc(activity);
  }, [activity]);

  if (activity.length === 0) {
    return (
      <div className="mt-6 text-center text-slate-400 text-lg">
        No activity yet — start tracking today 🚀
      </div>
    );
  }

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this entry?")) return;

    setActivity((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="w-[95vw] max-w-4xl mx-auto my-6 overflow-x-auto">
      <table className="w-full border-collapse bg-slate-800 rounded-xl overflow-hidden shadow-md">
        {/* Header */}
        <thead className="bg-slate-900">
          <tr>
            <th className="px-4 py-3 text-left text-sm uppercase tracking-wide text-slate-400">
              Date
            </th>
            <th className="px-4 py-3 text-center text-sm uppercase tracking-wide text-slate-400">
              Hours
            </th>
            <th className="px-4 py-3 text-center text-sm uppercase tracking-wide text-slate-400">
              Minutes
            </th>
            <th className="px-4 py-3 text-center text-sm uppercase tracking-wide text-slate-400">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {[...sortedActivity].map((obj, index) => (
            <tr
              key={obj.id}
              className={`border-t border-slate-700
        ${index % 2 === 0 ? "bg-slate-800" : "bg-slate-850"}
        hover:bg-slate-700 transition`}
            >
              {/* Date */}
              <td
                className="px-2 py-4 sm:px-4 sm:py-3
                     text-xs sm:text-sm
                     text-slate-200 font-mono
                     whitespace-nowrap"
              >
                {obj.date}
              </td>

              {/* Hour */}
              <td
                className="px-2 py-1 sm:px-4 sm:py-3
                     text-xs sm:text-sm
                     text-center text-slate-100 tabular-nums"
              >
                {obj.hour}
              </td>

              {/* Minute */}
              <td
                className="px-2 py-1 sm:px-4 sm:py-3
                     text-xs sm:text-sm
                     text-center text-slate-100 tabular-nums"
              >
                {obj.minute}
              </td>

              {/* Delete */}
              <td className="px-2 py-1 sm:px-4 sm:py-3 text-center">
                <button
                  onClick={() => handleDelete(obj.id)}
                  className="px-2 py-0.5 sm:px-3 sm:py-1
                     text-xs sm:text-sm
                     rounded-md
                     bg-rose-500/10 text-rose-400
                     hover:bg-rose-500 hover:text-white
                     transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activity;
