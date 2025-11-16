import { filterToday } from "../utils";
import { useState, useEffect } from "react";

import BottleTodayItem from "./BottleTodayItem";

export default function TodayBottleLogs({
  bottleLogs,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const [filteredBottles, setFilteredBottles] = useState(
    filterToday(bottleLogs),
  );
  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    setFilteredBottles(filterToday(bottleLogs));
  }, [bottleLogs]);

  return (
    <div className="rounded-md border border-gray-200 bg-yellow-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">🍼 Bottles</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredBottles.length > 0 ? (
          filteredBottles.map((log) => {
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
