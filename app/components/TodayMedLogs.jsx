import { filterToday } from "../utils";
import { useState, useEffect } from "react";

import MedTodayItem from "./MedTodayItem";

export default function TodayFoodLogs({ medLogs }) {
  const [filteredMeds, setFilteredMeds] = useState(filterToday(medLogs));

  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    setFilteredMeds(filterToday(medLogs));
  }, [medLogs]);

  return (
    <div className="rounded-md bg-neutral-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">💊 Meds</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredMeds.map((log, index) => {
          return (
            <MedTodayItem
              log={log}
              key={index}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          );
        })}
      </div>
    </div>
  );
}
