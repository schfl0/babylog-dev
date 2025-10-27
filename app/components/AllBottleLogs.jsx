import { getAllLogsDesc } from "../utils";
import { useState } from "react";

import BottleAllItem from "./BottleAllItem";

export default function AllBottleLogs({ bottleLogs }) {
  const [filteredBottles, setFilteredBottles] = useState(
    getAllLogsDesc(bottleLogs),
  );

  return (
    <div className="rounded-md bg-yellow-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">🍼 Bottles</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredBottles.map((log, index) => {
          return <BottleAllItem log={log} key={index} />;
        })}
      </div>
    </div>
  );
}
