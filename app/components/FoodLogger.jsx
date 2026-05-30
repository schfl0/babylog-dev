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
    <div className="rounded-xl border border-white/30 bg-white/30 p-4 shadow-md backdrop-blur-xl">
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
        <div className="mb-2 flex flex-col gap-2">
          <div className="flex w-full flex-col">
            <label htmlFor="food" className="text-2xs">
              Food
            </label>
            <input
              className="rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-sm"
              type="text"
              name="food"
              id="food"
              value={inputFood}
              onChange={(e) => setInputFood(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="g" className="text-2xs">
              G
            </label>
            <input
              className="rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-sm"
              type="number"
              min="0"
              name="g"
              id="g"
              value={inputG}
              onChange={(e) => setInputG(e.target.value)}
            />
          </div>
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
          className="mt-2 w-full cursor-pointer rounded-lg bg-green-200 p-2 transition-all hover:opacity-70"
        >
          {fetcher.state !== "idle" ? "Logging..." : "🥦 Food"}
        </button>
      </fetcher.Form>
    </div>
  );
}
