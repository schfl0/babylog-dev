import { useFetcher } from "react-router";
import { useState, useEffect } from "react";
import { filterTodayNaps, getNapDuration, formatTime } from "../utils";

export default function NapsTodayView({ session, todayView, napLogs }) {
  const fetcher = useFetcher();
  const [todayNaps, setTodayNaps] = useState(filterTodayNaps(napLogs));

  useEffect(() => {
    setTodayNaps(filterTodayNaps(napLogs));
  }, [napLogs]);

  return (
    <div className="rounded-md bg-blue-100 px-2 py-4 shadow-md">
      <fetcher.Form
        method="delete"
        action="/delete-todayview"
        className="mb-4 flex justify-between"
      >
        <input type="hidden" name="deleteTodayView" value={todayView} />
        <h2 className="font-bold">💤 Naps</h2>

        <button
          type="submit"
          className="cursor-pointer transition-all hover:opacity-50"
        >
          ❌
        </button>
      </fetcher.Form>
      <div className="text-xs">
        {todayNaps.length > 0 ? (
          todayNaps.map((nap, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center justify-between gap-1">
                <p>{formatTime(nap.start)}</p>
                <p>-</p>
                <p>{formatTime(nap.stop)}</p>
              </div>
              <p>{getNapDuration(nap)}</p>
            </div>
          ))
        ) : (
          <p>No logs yet</p>
        )}
      </div>
    </div>
  );
}
