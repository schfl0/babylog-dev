import { useFetcher } from "react-router";
import { formatTime, formatDate } from "../utils";
import FoodItemEdit from "../components/FoodItemEdit";

export default function OverviewFoodAllItem({
  log: food,
  isEdit,
  setIsEdit,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsEdit(food.id);
    setIsTodayEdit(false);
  }

  return (
    <>
      {isEdit === food.id && !isTodayEdit ? (
        <FoodItemEdit food={food} setIsEdit={setIsEdit} />
      ) : (
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
          <button
            className="ml-2 cursor-pointer hover:opacity-60"
            onClick={handleClick}
          >
            📝
          </button>
          <fetcher.Form method="post" action="/delete-log" className="ml-1">
            <input type="hidden" name="id" id="id" value={food.id} />
            <input type="hidden" name="log" id="log" value={food.log} />
            <button className="cursor-pointer transition-all hover:opacity-60">
              ❌
            </button>
          </fetcher.Form>
        </div>
      )}
    </>
  );
}
