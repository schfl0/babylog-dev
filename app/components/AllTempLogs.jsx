import { getAllLogsDesc } from "../utils";
import { useState } from "react";

import TempAllItem from "./TempAllItem";

export default function AllTempLogs({ tempLogs }) {
  const [filteredTemps, setFilteredTemps] = useState(getAllLogsDesc(tempLogs));

  return (
    <div className="text-2xs rounded-md border border-gray-200 bg-red-50 px-2 py-4 shadow-md">
      <h2 className="text-xs font-bold">🌡️ Temperature</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredTemps.length > 0 ? (
          filteredTemps.map((log, index) => {
            return <TempAllItem log={log} key={index} />;
          })
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
    </div>
  );
}
