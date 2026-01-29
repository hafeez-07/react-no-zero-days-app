import React, { useMemo, useState, useEffect } from "react";
import type { ActivityType } from "../App";
import { sortActivityByDateDesc } from "../utils/sorting";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { toast } from "sonner";

export type ActivityProps = {
  activity: ActivityType[];
  setActivity: React.Dispatch<React.SetStateAction<ActivityType[]>>;
};

function Activity({ activity, setActivity }: ActivityProps) {
  const [currentPage, setCurrentPage] = useState(() => {
    const raw = localStorage.getItem("currentPage");
    const page = Number(raw);
    return Number.isInteger(page) && page > 0 ? page : 1;
  });

  const sortedActivity = useMemo(() => {
    return sortActivityByDateDesc(activity);
  }, [activity]);

  let isMobile = false;
  if (window.innerWidth < 640) {
    isMobile = true;
  }

  const itemsPerPage = isMobile ? 11 : 8;
  const totalPage = Math.max(
    1,
    Math.ceil(sortedActivity.length / itemsPerPage),
  );

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(totalPage);
    }
  }, [totalPage, currentPage]);

  useEffect(() => {
    if (sortedActivity.length == 0) return;
    localStorage.setItem("currentPage", String(currentPage));
  }, [currentPage, sortedActivity.length]);

  const handleDelete = (id: number, date: string) => {
    toast("Confirm Delete?", {
      description: `This will permanently remove the entry for ${date}.`,
      duration: 6000,
      action: {
        label: "Delete",
        onClick: () => {
          setActivity((prev) => prev.filter((row) => row.id !== id));
          toast.success("Deleted successfully!", {
            duration: 2000,
          });
        },
      },

      cancel: {
        label: "cancel",
        onClick: () => {},
      },
    });
  };

  const currentListItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedActivity.slice(start, end);
  }, [currentPage, sortedActivity]);

  if (activity.length === 0) {
    return (
      <div className="mt-6 text-center text-slate-400 text-lg">
        No activity yet — start tracking today 🚀
      </div>
    );
  }

  return (
    <div className="w-[95vw] max-w-4xl mx-auto mt-6 overflow-x-auto ">
      <table className="w-full border-collapse bg-slate-800 rounded-xl overflow-hidden shadow-md">
        {/* Header */}
        <thead className="bg-slate-900">
          <tr>
            <th className="activity-table-head">Date</th>
            <th className="activity-table-head">Hours</th>
            <th className="activity-table-head">Minutes</th>
            <th className="activity-table-head">Action</th>
          </tr>
        </thead>

        <tbody>
          {[...currentListItems].map((obj, index) => (
            <tr
              key={obj.id}
              className={`border-t border-slate-700
        ${index % 2 === 0 ? "bg-slate-800" : "bg-slate-850"}
        hover:bg-slate-700 transition`}
            >
              {/* Date */}
              <td
                className="px-2 py-4 sm:px-4 sm:py-3
                     text-xs sm:text-sm text-center
                     text-slate-200 font-mono
                     "
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
                  onClick={() => handleDelete(obj.id, obj.date)}
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

      <div className="flex justify-center gap-5 mt-4 mb-4">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage == 1 ? true : false}
        >
          <FaAngleLeft />
        </button>
        <button className="border py-1 px-2 rounded bg-slate-700 border-slate-700">
          {currentPage}
        </button>
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage == totalPage ? true : false}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default Activity;
