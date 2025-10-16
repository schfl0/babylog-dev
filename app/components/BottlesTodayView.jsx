import { useFetcher } from "react-router";

import { useEffect, useState } from "react";
import { filterToday, formatTime } from "../utils";
export default function BottlesTodayView({ session, todayView, bottleLogs }) {
  const fetcher = useFetcher();

  const [todayBottles, setTodayBottles] = useState(filterToday(bottleLogs));

  useEffect(() => {
    setTodayBottles(filterToday(bottleLogs));
  }, [bottleLogs]);

  return (
    <div className="rounded-md bg-yellow-100 px-2 py-4 shadow-md">
      <fetcher.Form
        method="delete"
        action="/delete-todayview"
        className="mb-4 flex justify-between"
      >
        <input type="hidden" name="deleteTodayView" value={todayView} />
        <h2 className="font-bold">🍼 Bottles</h2>
        <button
          type="submit"
          className="cursor-pointer transition-all hover:opacity-50"
        >
          ❌
        </button>
      </fetcher.Form>
      <div className="text-xs">
        {todayBottles.length > 0 ? (
          todayBottles.map((bottle, index) => (
            <div key={index} className="flex items-center justify-between">
              <p>{bottle.ml} ml</p>
              <p>{formatTime(bottle.date)}</p>
            </div>
          ))
        ) : (
          <p>No logs yet</p>
        )}
      </div>
    </div>
  );
}
