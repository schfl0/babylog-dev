import { filterToday } from "../utils";
import { useState, useEffect } from "react";

import FoodTodayItem from "./FoodTodayItem";

export default function TodayFoodLogs({
  foodLogs,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const [filteredFoods, setFilteredFoods] = useState(filterToday(foodLogs));
  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    setFilteredFoods(filterToday(foodLogs));
  }, [foodLogs]);

  return (
    <div className="rounded-md border border-gray-200 bg-orange-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">🥕 Foods</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((log, index) => {
            return (
              <FoodTodayItem
                log={log}
                key={index}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
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
