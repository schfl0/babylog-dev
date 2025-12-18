import { getAllLogsDesc, getDateLogsDesc } from "../utils";
import { useState, useEffect } from "react";

import NapAllItem from "./NapAllItem";
import DateFilter from "./DateFilter";

export default function AllNapLogs({ napLogs, isTodayEdit, setIsTodayEdit }) {
  const [filteredNaps, setFilteredNaps] = useState(getAllLogsDesc(napLogs));

  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (!dateFilter) {
      setFilteredNaps(getAllLogsDesc(napLogs));
    } else {
      setFilteredNaps(getDateLogsDesc(dateFilter, napLogs));
    }
  }, [dateFilter, napLogs]);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="flex items-center">
        <h2 className="text-xs font-bold">💤 Naps</h2>
        <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>
      <div className="mt-4 flex flex-col justify-center">
        {filteredNaps.length > 0 ? (
          filteredNaps.map((log, index) => {
            return (
              <NapAllItem
                log={log}
                key={index}
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
