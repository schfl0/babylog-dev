import { useFetcher } from "react-router";
import { useEffect, useState } from "react";
import { filterToday, formatTime } from "../utils";

export default function MedsTodayView({ session, todayView, medLogs }) {
  const fetcher = useFetcher();

  const [todayMeds, setTodayMeds] = useState(filterToday(medLogs));

  useEffect(() => {
    setTodayMeds(filterToday(medLogs));
  }, [medLogs]);

  return (
    <div className="rounded-md bg-neutral-100 px-2 py-4 shadow-md">
      <fetcher.Form
        method="delete"
        action="/delete-todayview"
        className="mb-4 flex justify-between"
      >
        <input type="hidden" name="deleteTodayView" value={todayView} />
        <h2 className="font-bold">💊 Meds</h2>
        <button
          type="submit"
          className="cursor-pointer transition-all hover:opacity-50"
        >
          ❌
        </button>
      </fetcher.Form>
      <div className="text-xs">
        {todayMeds.length > 0 ? (
          todayMeds.map((med, index) => (
            <div key={index} className="flex items-center justify-between">
              <p>{med.med}</p>
              <p>{med.g} g</p>
              <p>{formatTime(med.date)}</p>
            </div>
          ))
        ) : (
          <p>No logs yet</p>
        )}
      </div>
    </div>
  );
}
