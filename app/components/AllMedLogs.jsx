import { getAllLogsDesc, getDateLogsDesc } from "../utils";
import { useState, useEffect } from "react";

import MedAllItem from "./MedAllItem";
import DateFilter from "./DateFilter";

export default function AllMedLogs({ medLogs }) {
  const [filteredMeds, setFilteredMeds] = useState(getAllLogsDesc(medLogs));

  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (!dateFilter) {
      setFilteredMeds(getAllLogsDesc(medLogs));
    } else {
      setFilteredMeds(getDateLogsDesc(dateFilter, medLogs));
    }
  }, [dateFilter, medLogs]);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="flex items-center">
        <h2 className="text-xs font-bold">💊 Medication</h2>
        <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>
      <div className="mt-4 flex flex-col justify-center">
        {filteredMeds.length > 0 ? (
          filteredMeds.map((log, index) => {
            return <MedAllItem log={log} key={index} />;
          })
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
    </div>
  );
}
