import { useState } from "react";
import type { ActivityProps } from "./Activity";

function UserInput({ activity, setActivity }: ActivityProps) {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const existingIndex = activity.findIndex((item) => item.date === date);

    if (existingIndex !== -1) {
      const confirmation = window.confirm(
        `Data of ${date} already exists.\nDo you want to replace?`,
      );
      if (!confirmation) return;

      setActivity((prev) =>
        prev.map((item, index) =>
          index === existingIndex ? { ...item, hour, minute } : item,
        ),
      );
    } else {
      setActivity((prev) => [...prev, { id: Date.now(), date, hour, minute }]);
    }

    setDate("");
    setHour("");
    setMinute("");
    alert("Data submitted");
  };

  return (
    <div className="bg-slate-800 border  border-slate-700 rounded-xl p-6 mt-6 w-full  ">
      <div className="text-2xl text-center mb-4">
        <h2>Add Activity</h2>
      </div>
      <form onSubmit={submitHandler} className="space-y-4">
        <div className="grid grid-cols-2 gap-3 items-center w-full">
          <label className="text-slate-300">Date</label>
          <input
            type="date"
            className="bg-slate-900 border border-slate-600 rounded-md p-2 text-slate-100 focus:ring-2 focus:ring-amber-400"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3 items-center">
          <label className="text-slate-300">Duration</label>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="hr"
              className="w-16 bg-slate-900 border border-slate-600 rounded-md p-2 text-center"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="min"
              className="w-16 bg-slate-900 border border-slate-600 rounded-md p-2 text-center"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              min={0}
              max={59}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full  py-2 rounded-lg bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserInput;
