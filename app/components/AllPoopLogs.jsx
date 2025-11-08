import { getAllLogsDesc } from "../utils";
import { useState } from "react";

import PoopAllItem from "./PoopAllItem";

export default function AllPoopLogs({ poopLogs }) {
  const [filteredPoops, setFilteredPoops] = useState(getAllLogsDesc(poopLogs));

  return (
    <div className="rounded-md bg-[#f6f0e8] px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">💩 Poops</h2>
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
