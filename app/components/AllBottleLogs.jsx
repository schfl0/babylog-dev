import { getAllLogsDesc, getDateLogsDesc } from "../utils";
import { useState, useEffect } from "react";

import BottleAllItem from "./BottleAllItem";
import DateFilter from "./DateFilter";

export default function AllBottleLogs({ bottleLogs }) {
  const [filteredBottles, setFilteredBottles] = useState(
    getAllLogsDesc(bottleLogs),
  );

  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (!dateFilter) {
      setFilteredBottles(getAllLogsDesc(bottleLogs));
    } else {
      setFilteredBottles(getDateLogsDesc(dateFilter, bottleLogs));
    }
  }, [dateFilter, bottleLogs]);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="flex items-center">
        <h2 className="text-xs font-bold">🍼 Bottles</h2>
        <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>
      <div className="mt-4 flex flex-col justify-center">
        {filteredBottles.length > 0 ? (
          filteredBottles.map((log, index) => {
            return <BottleAllItem log={log} key={index} />;
          })
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
    </div>
  );
}
