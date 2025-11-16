import { filterToday } from "../utils";
import { useState, useEffect } from "react";

import TempTodayItem from "./TempTodayItem";

export default function TodayTempLogs({
  tempLogs,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const [filteredTemps, setFilteredTemps] = useState(filterToday(tempLogs));

  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    setFilteredTemps(filterToday(tempLogs));
  }, [tempLogs]);

  return (
    <div className="rounded-md border border-gray-200 bg-red-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">🌡️ Temps</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredTemps.length > 0 ? (
          filteredTemps.map((log, index) => {
            return (
              <TempTodayItem
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
