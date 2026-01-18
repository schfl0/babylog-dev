import { formatTime } from "../utils";
export default function OverviewFoodTodayItem({ log: food }) {
  return (
    <div className="flex items-center justify-start">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>🥦</p>
          <p>{food.food}</p>
        </div>
        <p>{food.g} g</p>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p className="ml-12">{formatTime(food.date)}</p>
      </div>
    </div>
  );
}
