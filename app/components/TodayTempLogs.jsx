import { filterToday } from "../utils";
import { useState } from "react";

import TempTodayItem from "./TempTodayItem";

export default function TodayTempLogs({ tempLogs }) {
  const [filteredTemps, setFilteredTemps] = useState(filterToday(tempLogs));

  return (
    <div className="rounded-md bg-red-50 px-2 py-4 text-sm shadow-md">
      <h2 className="font-bold">🌡️ Temps</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredTemps.map((log, index) => {
          return <TempTodayItem log={log} key={index} />;
        })}
      </div>
    </div>
  );
}
