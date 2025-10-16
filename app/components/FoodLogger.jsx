import { useFetcher } from "react-router";
import { useState, useEffect } from "react";

export default function FoodLogger({ session, logger }) {
  const fetcher = useFetcher();
  const [inputFood, setInputFood] = useState("");
  const [inputG, setInputG] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle") {
      setInputFood("");
      setInputG("");
    }
  }, [fetcher.state]);

  return (
    <div className="rounded-md px-2 py-4 shadow-md">
      <fetcher.Form
        method="delete"
        action="/delete-logger"
        className="flex justify-end"
      >
        <input type="hidden" name="deleteLogger" value={logger} />
        <button
          type="submit"
          className="cursor-pointer transition-all hover:opacity-50"
        >
          ❌
        </button>
      </fetcher.Form>

      <fetcher.Form method="post" action="/food-logger">
        <div className="mt-2 mb-2 flex items-center justify-center gap-2 text-xs">
          <label htmlFor="food">Food:</label>
          <input
            className="w-full rounded-sm border border-gray-400 px-1 py-0.5"
            type="text"
            name="food"
            id="food"
            value={inputFood}
            onChange={(e) => setInputFood(e.target.value)}
          />

          <label htmlFor="g">g:</label>
          <input
            className="w-14 rounded-sm border border-gray-400 px-1 py-0.5"
            type="number"
            name="g"
            id="g"
            value={inputG}
            onChange={(e) => setInputG(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-sm bg-orange-200 p-2 transition-all hover:opacity-70"
        >
          🥕 Food
        </button>
      </fetcher.Form>
    </div>
  );
}
