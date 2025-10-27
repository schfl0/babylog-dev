import { filterToday } from "../utils";
import { useState, useEffect } from "react";

import BottleTodayItem from "./BottleTodayItem";

export default function TodayBottleLogs({ bottleLogs }) {
  const [filteredBottles, setFilteredBottles] = useState(
    filterToday(bottleLogs),
  );
  const [isEdit, setIsEdit] = useState(null);

  return (
    <div className="rounded-md bg-yellow-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">🍼 Bottles</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredBottles.map((log) => {
          return (
            <BottleTodayItem
              log={log}
              key={log.id}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          );
        })}
      </div>
    </div>
  );
}
