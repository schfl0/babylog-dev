import { filterTodayNaps } from "../utils";
import { useState } from "react";

import NapTodayItem from "./NapTodayItem";

export default function TodayNapLogs({ napLogs }) {
  const [filteredNaps, setFilteredNaps] = useState(filterTodayNaps(napLogs));

  return (
    <div className="rounded-md bg-blue-50 px-2 py-4 text-sm shadow-md">
      <h2 className="font-bold">💤 Naps</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredNaps.map((log, index) => {
          return <NapTodayItem log={log} key={index} />;
        })}
      </div>
    </div>
  );
}
