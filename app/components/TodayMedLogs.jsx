import { filterToday } from "../utils";
import { useState, useEffect } from "react";

import MedTodayItem from "./MedTodayItem";

export default function TodayFoodLogs({
  todayMeds,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const [isEdit, setIsEdit] = useState(null);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <h2 className="text-xs font-bold">💊 Medication</h2>
      <div className="mt-4 flex flex-col justify-center">
        {todayMeds.length > 0 ? (
          todayMeds.map((log, index) => {
            return (
              <MedTodayItem
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
