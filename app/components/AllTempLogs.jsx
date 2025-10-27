import { getAllLogsDesc } from "../utils";
import { useState } from "react";

import TempAllItem from "./TempAllItem";

export default function AllTempLogs({ tempLogs }) {
  const [filteredTemps, setFilteredTemps] = useState(getAllLogsDesc(tempLogs));

  return (
    <div className="rounded-md bg-red-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">🌡️ Temps</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredTemps.map((log, index) => {
          return <TempAllItem log={log} key={index} />;
        })}
      </div>
    </div>
  );
}
