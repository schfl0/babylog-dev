import { filterToday } from "../utils";
import { useState, useEffect } from "react";
import PoopTodayItem from "./PoopTodayItem";

export default function TodayPoopLogs({
  poopLogs,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const [filteredPoops, setFilteredPoops] = useState(filterToday(poopLogs));

  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    setFilteredPoops(filterToday(poopLogs));
  }, [poopLogs]);

  return (
    <div className="rounded-md border border-gray-200 bg-[#f6f0e8] px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">💩 Poops</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredPoops.length > 0 ? (
          filteredPoops.map((log, index) => {
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
