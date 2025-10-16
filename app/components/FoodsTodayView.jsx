import { useFetcher } from "react-router";

import { useEffect, useState } from "react";
import { filterToday, formatTime } from "../utils";
export default function FoodsTodayView({ session, todayView, foodLogs }) {
  const fetcher = useFetcher();

  const [todayFoods, setTodayFoods] = useState(filterToday(foodLogs));

  useEffect(() => {
    setTodayFoods(filterToday(foodLogs));
  }, [foodLogs]);

  return (
    <div className="rounded-md bg-orange-100 px-2 py-4 shadow-md">
      <fetcher.Form
        method="delete"
        action="/delete-todayview"
        className="mb-4 flex justify-between"
      >
        <input type="hidden" name="deleteTodayView" value={todayView} />
        <h2 className="font-bold">🥕 Foods</h2>
        <button
          type="submit"
          className="cursor-pointer transition-all hover:opacity-50"
        >
          ❌
        </button>
      </fetcher.Form>
      <div className="text-xs">
        {todayFoods.length > 0 ? (
          todayFoods.map((food, index) => (
            <div key={index} className="flex items-center justify-between">
              <p>{food.food}</p>
              <p>{food.g} g</p>
              <p>{formatTime(food.date)}</p>
            </div>
          ))
        ) : (
          <p>No logs yet</p>
        )}
      </div>
    </div>
  );
}
