import { useFetcher } from "react-router";
import { formatTime, formatDate } from "../utils";
import FoodItemEdit from "../components/FoodItemEdit";

export default function FoodAllItem({ log: food, isEdit, setIsEdit }) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsEdit(food.id);
  }

  return (
    <div
      className={`text-xs hover:shadow-sm ${isEdit === food.id ? "my-1 rounded-md border border-gray-200 p-2" : ""}`}
    >
      <div className="flex items-center justify-start text-xs hover:shadow-sm">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
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
        {isEdit !== food.id && (
          <>
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
                🗑️
              </button>
            </fetcher.Form>
          </>
        )}
      </div>
      {isEdit === food.id && <FoodItemEdit setIsEdit={setIsEdit} food={food} />}
    </div>
  );
}
