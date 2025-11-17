import { getAllLogsDesc } from "../utils";
import { useState } from "react";

import MedAllItem from "./MedAllItem";

export default function AllMedLogs({ medLogs }) {
  const [filteredMeds, setFilteredMeds] = useState(getAllLogsDesc(medLogs));

  return (
    <div className="rounded-md border border-gray-200 bg-neutral-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">💊 Medication</h2>
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
