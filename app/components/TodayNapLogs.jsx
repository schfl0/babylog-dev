import { filterTodayNaps } from "../utils";
import { useState, useEffect } from "react";
import NapTodayItem from "./NapTodayItem";

export default function TodayNapLogs({
  todayNaps,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const [isEdit, setIsEdit] = useState(null);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <h2 className="text-xs font-bold">💤 Naps</h2>
      <div className="mt-4 flex flex-col justify-center">
        {todayNaps.length > 0 ? (
          todayNaps.map((log, index) => {
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
