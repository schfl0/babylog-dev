import { useFetcher } from "react-router";
import { useState, useEffect } from "react";

export default function TempLogger({ session, logger }) {
  const fetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const [inputTemp, setInputTemp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle") setInputTemp("");
  }, [fetcher.state]);

  useEffect(() => {
    if (fetcher.data?.temp?.[0]) {
      setErrorMsg(fetcher.data.temp[0]);
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

      <fetcher.Form method="post" action="/temp-logger">
        <div className="mb-2 flex items-center justify-center gap-2">
          <div className="flex w-full flex-col">
            <label htmlFor="temp" className="text-2xs">
              °C
            </label>
            <input
              className="rounded-lg border border-white/30 bg-white/10 p-2 backdrop-blur-sm"
              type="number"
              name="temp"
              id="temp"
              min="0"
              value={inputTemp}
              onChange={(e) => setInputTemp(e.target.value)}
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
          className="mt-2 w-full cursor-pointer rounded-lg bg-red-200 p-2 transition-all hover:opacity-70"
        >
          {fetcher.state === "submitting" ? "Logging..." : "🌡️ Temperature"}
        </button>
      </fetcher.Form>
    </div>
  );
}
