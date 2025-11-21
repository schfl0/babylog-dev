import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function BottleLogger({ session, logger }) {
  const fetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const [inputMl, setInputMl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle") {
      setInputMl("");
    }
  }, [fetcher.state]);

  useEffect(() => {
    if (fetcher.data?.ml?.[0]) {
      setErrorMsg(fetcher.data.ml[0]);
      const timer = setTimeout(() => setErrorMsg(""), 2000);
      return () => clearTimeout(timer);
    }
    if (fetcher.data?.success) {
      setSuccessMsg("Success!");
      const timer = setTimeout(() => setSuccessMsg(""), 2000);
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

      <fetcher.Form method="post" action="/bottle-logger">
        <div className="mt-2 mb-2 flex items-center justify-center gap-2 text-xs">
          <label htmlFor="ml">Bottle (ml):</label>
          <input
            className="w-14 rounded-sm border border-gray-400 px-1 py-0.5"
            type="number"
            min="0"
            name="ml"
            id="ml"
            value={inputMl}
            onChange={(e) => setInputMl(e.target.value)}
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
          className="mt-2 w-full cursor-pointer rounded-sm bg-yellow-100 p-2 transition-all hover:opacity-70"
        >
          {fetcher.state === "submitting" ? "Logging..." : "🍼 Bottle"}
        </button>
      </fetcher.Form>
    </div>
  );
}
