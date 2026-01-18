import { getAllLogsDesc, getDateLogsDesc } from "../utils";
import { useState, useEffect } from "react";

import FoodAllItem from "./FoodAllItem";
import DateFilter from "./DateFilter";

export default function AllFoodLogs({ foodLogs }) {
  const [filteredFoods, setFilteredFoods] = useState(getAllLogsDesc(foodLogs));

  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (!dateFilter) {
      setFilteredFoods(getAllLogsDesc(foodLogs));
    } else {
      setFilteredFoods(getDateLogsDesc(dateFilter, foodLogs));
    }
  }, [dateFilter, foodLogs]);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="flex items-center">
        <h2 className="text-xs font-bold">🥦 Foods</h2>
        <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>
      <div className="mt-4 flex flex-col justify-center">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((log, index) => {
            return <FoodAllItem log={log} key={index} />;
          })
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
    </div>
  );
}
