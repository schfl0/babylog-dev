import { useFetcher } from "react-router";
import { useEffect, useState } from "react";
import { filterToday, formatTime } from "../utils";

export default function TempsTodayView({ session, todayView, tempLogs }) {
  const fetcher = useFetcher();

  const [todayTemps, setTodayTemps] = useState(filterToday(tempLogs));

  useEffect(() => {
    setTodayTemps(filterToday(tempLogs));
  }, [tempLogs]);

  return (
    <div className="rounded-md bg-red-100 px-2 py-4 shadow-md">
      <fetcher.Form
        method="delete"
        action="/delete-todayview"
        className="mb-4 flex justify-between"
      >
        <input type="hidden" name="deleteTodayView" value={todayView} />
        <h2 className="font-bold">🌡️ Temps</h2>
        <button
          type="submit"
          className="cursor-pointer transition-all hover:opacity-50"
        >
          ❌
        </button>
      </fetcher.Form>
      <div className="text-xs">
        {todayTemps.length > 0 ? (
          todayTemps.map((temp, index) => (
            <div key={index} className="flex items-center justify-between">
              <p>{temp.temp} °C</p>
              <p>{formatTime(temp.date)}</p>
            </div>
          ))
        ) : (
          <p>No logs yet</p>
        )}
      </div>
    </div>
  );
}
