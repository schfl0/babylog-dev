import { filterTodayNaps } from "../utils";
import { useState, useEffect } from "react";
import NapTodayItem from "./NapTodayItem";

export default function TodayNapLogs({ napLogs, isTodayEdit, setIsTodayEdit }) {
  const [filteredNaps, setFilteredNaps] = useState(filterTodayNaps(napLogs));
  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    setFilteredNaps(filterTodayNaps(napLogs));
  }, [napLogs]);

  return (
    <div className="rounded-md bg-blue-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">💤 Naps</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredNaps.length > 0 ? (
          filteredNaps.map((log, index) => {
            return (
              <NapTodayItem
                log={log}
                key={index}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isTodayEdit={isTodayEdit}
                setIsTodayEdit={setIsTodayEdit}
              />
            );
          })
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
    </div>
  );
}
