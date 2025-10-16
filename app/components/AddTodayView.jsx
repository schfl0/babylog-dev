import { useState, useEffect } from "react";
import { capitalizeStr } from "../utils";
import { useFetcher } from "react-router";

export default function AddTodayView() {
  const fetcher = useFetcher();
  const options = ["bottles", "foods", "naps", "temps", "meds"];
  const [selectedTodayView, setSelectedTodayView] = useState(options[0]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data !== undefined) {
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <fetcher.Form
      method="post"
      action="/add-todayview"
      className="flex items-center justify-start gap-4"
    >
      <label htmlFor="addTodayView">Add view:</label>
      <select
        className="rounded-sm border px-2 py-1"
        name="addTodayView"
        id="addTodayView"
        value={selectedTodayView}
        onChange={(e) => setSelectedTodayView(e.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{capitalizeStr(option)}</option>
        ))}
      </select>
      <button
        type="submit"
        className="cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-sm text-white transition-all hover:opacity-60"
      >
        🔎 Add
      </button>
    </fetcher.Form>
  );
}
