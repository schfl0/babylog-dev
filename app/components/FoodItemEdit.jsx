import { formatTimeLocal, formatISODateLocal } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function FoodItemEdit({ food, setIsEdit }) {
  const fetcher = useFetcher();
  const [inputFood, setInputFood] = useState(food.food);
  const [inputG, setInputG] = useState(food.g);
  const [inputDate, setInputDate] = useState(formatISODateLocal(food.date));
  const [inputTime, setInputTime] = useState(formatTimeLocal(food.date));

  const prevState = useRef(fetcher.state);

  useEffect(() => {
    if (prevState.current === "loading" && fetcher.state === "idle") {
      setIsEdit(null);
    }
    prevState.current = fetcher.state;
  }, [fetcher.state]);

  return (
    <fetcher.Form
      method="post"
      action="/edit-food"
      className="text-3xs mt-1 flex w-full flex-col items-start gap-1 border-t border-gray-300 pt-1"
    >
      <input type="hidden" name="id" id="id" value={food.id} />
      <div className="flex w-full justify-between">
        {" "}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="food" className="font-medium">
            Food
          </label>
          <input
            className="rounded-sm border border-gray-400 bg-green-50 px-1 py-0.5"
            type="text"
            name="food"
            id="food"
            value={inputFood}
            onChange={(e) => setInputFood(e.target.value)}
          />
          {fetcher?.data?.food?.[0] && (
            <p className="mt-0.5 text-[8px] leading-none text-red-500">
              {fetcher.data.food[0]}
            </p>
          )}
        </div>
        <div className="mt-1 flex gap-2 text-sm">
          <button
            type="submit"
            className="cursor-pointer transition-all hover:opacity-60"
          >
            ✅
          </button>
          <button
            type="button"
            className="cursor-pointer transition-all hover:opacity-60"
            onClick={() => setIsEdit(null)}
          >
            🚫
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="g" className="font-medium">
          g
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-green-50 px-1 py-0.5"
          type="number"
          name="g"
          id="g"
          value={inputG}
          onChange={(e) => setInputG(e.target.value)}
        />
        {fetcher?.data?.g?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.g[0]}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="date" className="font-medium">
          Date
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-green-50 px-1 py-0.5"
          type="date"
          name="date"
          id="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />
        {fetcher?.data?.date?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.date[0]}
          </p>
        )}
      </div>
      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="time" className="font-medium">
          Time
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-green-50 px-1"
          type="time"
          name="time"
          id="time"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        {fetcher?.data?.time?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.time[0]}
          </p>
        )}
        <input
          type="hidden"
          name="timezoneOffset"
          id="timezoneOffset"
          value={new Date().getTimezoneOffset()}
        />
      </div>
    </fetcher.Form>
  );
}
