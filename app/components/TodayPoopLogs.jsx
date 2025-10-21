import { filterToday } from "../utils";
import { useState } from "react";

import PoopTodayItem from "./PoopTodayItem";

export default function TodayPoopLogs({ poopLogs }) {
  const [filteredPoops, setFilteredPoops] = useState(filterToday(poopLogs));

  return (
    <div className="rounded-md bg-[#f6f0e8] px-2 py-4 text-sm shadow-md">
      <h2 className="font-bold">💩 Poops</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredPoops.map((log, index) => {
          return <PoopTodayItem log={log} key={index} />;
        })}
      </div>
    </div>
  );
}
