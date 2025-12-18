import { getAllLogsDesc, getDateLogsDesc } from "../utils";
import { useState, useEffect } from "react";

import TempAllItem from "./TempAllItem";
import DateFilter from "./DateFilter";

export default function AllTempLogs({ tempLogs }) {
  const [filteredTemps, setFilteredTemps] = useState(getAllLogsDesc(tempLogs));

  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (!dateFilter) {
      setFilteredTemps(getAllLogsDesc(tempLogs));
    } else {
      setFilteredTemps(getDateLogsDesc(dateFilter, tempLogs));
    }
  }, [dateFilter, tempLogs]);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="flex items-center">
        <h2 className="text-xs font-bold">🌡️ Temperature</h2>
        <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>
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
