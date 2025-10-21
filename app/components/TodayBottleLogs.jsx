import { filterToday } from "../utils";
import { useState } from "react";

import BottleTodayItem from "./BottleTodayItem";

export default function TodayBottleLogs({ bottleLogs }) {
  const [filteredBottles, setFilteredBottles] = useState(
    filterToday(bottleLogs),
  );

  return (
    <div className="rounded-md bg-yellow-50 px-2 py-4 text-sm shadow-md">
      <h2 className="font-bold">🍼 Bottles</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredBottles.map((log, index) => {
          return <BottleTodayItem log={log} key={index} />;
        })}
      </div>
    </div>
  );
}
