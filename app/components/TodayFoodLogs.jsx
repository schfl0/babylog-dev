import { filterToday } from "../utils";
import { useState } from "react";

import FoodTodayItem from "./FoodTodayItem";

export default function TodayFoodLogs({ foodLogs }) {
  const [filteredFoods, setFilteredFoods] = useState(filterToday(foodLogs));

  return (
    <div className="rounded-md bg-orange-50 px-2 py-4 text-sm shadow-md">
      <h2 className="font-bold">🥕 Foods</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredFoods.map((log, index) => {
          return <FoodTodayItem log={log} key={index} />;
        })}
      </div>
    </div>
  );
}
