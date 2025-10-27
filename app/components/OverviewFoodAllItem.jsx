import { formatTime, formatDate } from "../utils";
export default function OverviewFoodAllItem({ log: food }) {
  return (
    <div className="flex items-center justify-start bg-orange-50 p-1">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>🥕</p>
          <p>{food.food}</p>
        </div>
        <p>{food.g} g</p>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p className="ml-12">{formatTime(food.date)}</p>
      </div>
      <div className="ml-6 flex items-center justify-end">
        <p>{formatDate(food.date)}</p>
      </div>
    </div>
  );
}
