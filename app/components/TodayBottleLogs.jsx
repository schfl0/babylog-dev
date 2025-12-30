import { filterToday } from "../utils";
import { useState, useEffect } from "react";
import BottleTodayItem from "./BottleTodayItem";

export default function TodayBottleLogs({
  todayBottles,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const [isEdit, setIsEdit] = useState(null);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <h2 className="text-xs font-bold">🍼 Bottles</h2>
      <div className="mt-4 flex flex-col justify-center">
        {todayBottles.length > 0 ? (
          todayBottles.map((log) => {
            return (
              <BottleTodayItem
                log={log}
                key={log.id}
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
