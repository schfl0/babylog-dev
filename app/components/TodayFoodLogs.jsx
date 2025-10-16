import { useState, useEffect } from "react";
import { filterToday } from "../utils";

export default function TodayFoodLogs({ foodLogs }) {
  const [todayFoods, setTodayFoods] = useState(filterToday(foodLogs));

  useEffect(() => {
    setTodayFoods(filterToday(foodLogs));
  }, [foodLogs]);

  console.log(todayFoods);
  return (
    <div>
      <p>Today Foods</p>
      {todayFoods.length > 0 && todayFoods.map((food) => <p>{food.food}</p>)}
    </div>
  );
}
