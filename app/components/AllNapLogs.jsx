import { getAllLogsDesc } from "../utils";
import { useState } from "react";

import NapAllItem from "./NapAllItem";

export default function AllNapLogs({ napLogs, isTodayEdit, setIsTodayEdit }) {
  const [filteredNaps, setFilteredNaps] = useState(getAllLogsDesc(napLogs));

  return (
    <div className="rounded-md border border-gray-200 bg-blue-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">💤 Naps</h2>
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
