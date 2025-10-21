import { filterToday } from "../utils";
import { useState } from "react";

import MedTodayItem from "./MedTodayItem";

export default function TodayFoodLogs({ medLogs }) {
  const [filteredMeds, setFilteredMeds] = useState(filterToday(medLogs));

  return (
    <div className="rounded-md bg-neutral-50 px-2 py-4 text-sm shadow-md">
      <h2 className="font-bold">💊 Meds</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredMeds.map((log, index) => {
          return <MedTodayItem log={log} key={index} />;
        })}
      </div>
    </div>
  );
}
