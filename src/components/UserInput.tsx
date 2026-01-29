import { useState } from "react";
import { toast } from "sonner";
import type { ActivityProps } from "./Activity";

function UserInput({ activity, setActivity }: ActivityProps) {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const existingItem = activity.find((item) => item.date === date);

    if (existingItem) {
      toast("Entry already exists", {
        description: `Replace data for ${date}?`,
        duration: 6000,
        action: {
          label: "Replace",
          onClick: () => {
            setActivity((prev) =>
              prev.map((item) =>
                item.date === date ? { ...item, hour, minute } : item,
              ),
            );
            toast.success("Data updated successfully", {
              duration: 2000,
            });
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {},
        },
      });
      return;
    }

    setActivity((prev) => [...prev, { id: Date.now(), date, hour, minute }]);

    toast.success("Data saved successfully", {
      duration: 2000,
    });

    setDate("");
    setHour("");
    setMinute("");
  };

  return (
    <div className="bg-slate-800 border  border-slate-700 rounded-xl px-6 pt-4 mt-6 w-full  ">
      <div className="text-2xl text-center mb-6  font-semibold">
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
            max={new Date().toISOString().split("T")[0]}
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
              min={0}
              max={24}
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
          className="w-full  py-2 rounded-lg bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition mb-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserInput;
