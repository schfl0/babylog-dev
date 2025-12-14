import { getAllLogsDesc } from "../utils";
import { useState } from "react";

import BottleAllItem from "./BottleAllItem";

export default function AllBottleLogs({ bottleLogs }) {
  const [filteredBottles, setFilteredBottles] = useState(
    getAllLogsDesc(bottleLogs),
  );

  return (
    <div className="text-2xs rounded-md border border-gray-200 bg-yellow-50 px-2 py-4 shadow-md">
      <h2 className="text-xs font-bold">🍼 Bottles</h2>
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
