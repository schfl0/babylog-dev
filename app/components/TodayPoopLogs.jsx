import { filterToday } from "../utils";
import { useState, useEffect } from "react";
import PoopTodayItem from "./PoopTodayItem";

export default function TodayPoopLogs({
  todayPoops,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const [isEdit, setIsEdit] = useState(null);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <h2 className="text-sm font-bold">💩 Poops</h2>
      <div className="mt-4 flex flex-col justify-center">
        {todayPoops.length > 0 ? (
          todayPoops.map((log, index) => {
            return (
              <PoopTodayItem
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
