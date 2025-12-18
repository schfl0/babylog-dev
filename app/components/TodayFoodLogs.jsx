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
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <h2 className="text-xs font-bold">🥕 Foods</h2>
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
