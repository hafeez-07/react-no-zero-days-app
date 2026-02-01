import React, { useMemo, useState, useEffect, useRef } from "react";
import type { ActivityType } from "../App";
import { sortActivityByDateDesc } from "../utils/sorting";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { toast } from "sonner";
import { STORAGE_KEYS } from "../constants/StorageKeys";

export type ActivityProps = {
  activity: ActivityType[];
  setActivity: React.Dispatch<React.SetStateAction<ActivityType[]>>;
};

function Activity({ activity, setActivity }: ActivityProps) {
  const backupActivity = useRef<ActivityType[]>([]);
  const [currentPage, setCurrentPage] = useState(() => {
    const raw = localStorage.getItem("currentPage");
    const page = Number(raw);
    return Number.isInteger(page) && page > 0 ? page : 1;
  });

  const sortedActivity = useMemo(
    () => sortActivityByDateDesc(activity),
    [activity],
  );

  let isMobile = false;
  if (window.innerWidth < 640) isMobile = true;

  const itemsPerPage = isMobile ? 10 : 7;
  const totalPage = Math.max(
    1,
    Math.ceil(sortedActivity.length / itemsPerPage),
  );

  useEffect(() => {
    if (currentPage > totalPage) setCurrentPage(totalPage);
  }, [totalPage, currentPage]);

  useEffect(() => {
    if (sortedActivity.length == 0) return;
    localStorage.setItem("currentPage", String(currentPage));
  }, [currentPage, sortedActivity.length]);

  const currentListItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedActivity.slice(start, end);
  }, [currentPage, sortedActivity]);

  if (activity.length === 0) {
    return (
      <div className="mt-6 text-center text-slate-500 dark:text-slate-400 text-lg">
        No activity yet — start tracking today 🚀
      </div>
    );
  }

  const handleDelete = (id: number, date: string) => {
    toast("Confirm Delete?", {
      description: `This will permanently remove the entry for ${date}.`,
      duration: 6000,
      action: {
        label: "Delete",
        onClick: () => {
          setActivity((prev) => prev.filter((row) => row.id !== id));
          toast.success("Deleted successfully!", { duration: 1500 });
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    });
  };

  const deleteAllActivity = () => {
    toast("Confirm clear All?", {
      description: "You will lose all progress permanently",
      duration: 8000,
      action: {
        label: "Clear all",
        onClick: () => {
          backupActivity.current = activity;
          setActivity([]);
          toast("All activity cleared", {
            duration: 6000,
            action: {
              label: "Undo",
              onClick: () => {
                setActivity(backupActivity.current);
                backupActivity.current = [];
              },
            },
          });
          setTimeout(() => {
            if (backupActivity.current.length > 0) {
              localStorage.removeItem(STORAGE_KEYS.ACTIVITY);
              localStorage.removeItem(STORAGE_KEYS.LAST_CELEBRATED);
              localStorage.removeItem(STORAGE_KEYS.CURRENT_PAGE);
            }
          }, 6000);
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    });
  };

  return (
    <div className="w-[95vw] max-w-4xl mx-auto mt-6 overflow-x-auto">
      {/* Header */}
      <div className="flex justify-between items-center px-6 sm:px-10 mb-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
          Activity Logs
        </h2>

        <button
          onClick={deleteAllActivity}
          className="
            text-sm font-semibold px-3 py-1 rounded
            bg-rose-50 dark:bg-rose-500/10
            text-rose-600 dark:text-rose-400
            border border-rose-200 dark:border-rose-500/30
            hover:bg-rose-500 hover:text-white
            transition
          "
        >
          Clear all
        </button>
      </div>

      {/* Table */}
      <table className="
        w-full border-collapse overflow-hidden rounded-xl
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        shadow-sm dark:shadow-none
      ">
        <thead className="bg-slate-100 dark:bg-slate-900">
          <tr>
            <th className="activity-table-head">Date</th>
            <th className="activity-table-head">Hours</th>
            <th className="activity-table-head">Minutes</th>
            <th className="activity-table-head">Action</th>
          </tr>
        </thead>

        <tbody>
          {currentListItems.map((obj, index) => (
            <tr
              key={obj.id}
              className={`
                border-t border-slate-200 dark:border-slate-700
                ${index % 2 === 0
                  ? "bg-white dark:bg-slate-800"
                  : "bg-slate-50 dark:bg-slate-900"}
                hover:bg-slate-100 dark:hover:bg-slate-700
                transition
              `}
            >
              <td className="px-2 py-3 sm:px-4 text-center text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-200">
                {obj.date}
              </td>

              <td className="px-2 py-3 sm:px-4 text-center text-xs sm:text-sm tabular-nums text-slate-800 dark:text-slate-100">
                {obj.hour}
              </td>

              <td className="px-2 py-3 sm:px-4 text-center text-xs sm:text-sm tabular-nums text-slate-800 dark:text-slate-100">
                {obj.minute}
              </td>

              <td className="px-2 py-3 sm:px-4 text-center">
                <button
                  onClick={() => handleDelete(obj.id, obj.date)}
                  className="
                    px-3 py-1 text-xs sm:text-sm rounded-md
                    bg-rose-100 dark:bg-rose-500/10
                    text-rose-600 dark:text-rose-400
                    hover:bg-rose-500 hover:text-white
                    transition
                  "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-5 mt-4 mb-4">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          <FaAngleLeft />
        </button>

        <button className="pagination-btn cursor-default">
          {currentPage}
        </button>

        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPage}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default Activity;
