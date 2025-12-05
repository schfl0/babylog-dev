import { useFetcher } from "react-router";
import { useState, useEffect } from "react";

export default function FoodLogger({ session, logger }) {
  const fetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const [inputFood, setInputFood] = useState("");
  const [inputG, setInputG] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle") {
      setInputFood("");
      setInputG("");
    }
  }, [fetcher.state]);

  useEffect(() => {
    if (fetcher.data?.food?.[0] || fetcher.data?.g?.[0]) {
      setErrorMsg(
        Object.values(fetcher?.data).flat().filter(Boolean).join(" "),
      );
      const timer = setTimeout(() => setErrorMsg(""), 1000);
      return () => clearTimeout(timer);
    }
    if (fetcher.data?.success) {
      setSuccessMsg("Success!");
      const timer = setTimeout(() => setSuccessMsg(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.data]);

  return (
    <div className="rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <deleteFetcher.Form
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
      </deleteFetcher.Form>

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
            min="0"
            name="g"
            id="g"
            value={inputG}
            onChange={(e) => setInputG(e.target.value)}
          />
        </div>
        {errorMsg && (
          <p className="mt-0.5 text-center text-[9px] opacity-50">
            🚫 {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="mt-0.5 text-center text-[9px] opacity-50">
            ✅ {successMsg}
          </p>
        )}
        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-sm bg-orange-100 p-2 transition-all hover:opacity-70"
        >
          {fetcher.state !== "idle" ? "Logging..." : "🥕 Food"}
        </button>
      </fetcher.Form>
    </div>
  );
}
