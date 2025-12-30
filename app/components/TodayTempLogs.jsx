import { filterToday } from "../utils";
import { useState, useEffect } from "react";

import TempTodayItem from "./TempTodayItem";

export default function TodayTempLogs({
  todayTemps,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const [isEdit, setIsEdit] = useState(null);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <h2 className="text-xs font-bold">🌡️ Temperature</h2>
      <div className="mt-4 flex flex-col justify-center">
        {todayTemps.length > 0 ? (
          todayTemps.map((log, index) => {
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
