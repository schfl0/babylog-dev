import { getAllLogsDesc, getDateLogsDesc } from "../utils";
import { useState, useEffect } from "react";
import PoopAllItem from "./PoopAllItem";
import DateFilter from "./DateFilter";

export default function AllPoopLogs({ poopLogs }) {
  const [filteredPoops, setFilteredPoops] = useState(getAllLogsDesc(poopLogs));

  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (!dateFilter) {
      setFilteredPoops(getAllLogsDesc(poopLogs));
    } else {
      setFilteredPoops(getDateLogsDesc(dateFilter, poopLogs));
    }
  }, [dateFilter, poopLogs]);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="flex items-center">
        <h2 className="text-xs font-bold">💩 Poops</h2>
        <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>
      <div className="mt-4 flex flex-col justify-center">
        {filteredPoops.length > 0 ? (
          filteredPoops.map((log, index) => {
            return <PoopAllItem log={log} key={index} />;
          })
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
    </div>
  );
}
