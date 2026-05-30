import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";
import { capitalizeStr } from "../utils";

export default function BottleLogger({ session, logger }) {
  const fetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const [inputMl, setInputMl] = useState("");
  const [inputType, setInputType] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle") {
      setInputMl("");
      setInputType("formula");
    }
  }, [fetcher.state]);

  useEffect(() => {
    if (fetcher.data?.ml?.[0] || fetcher.data?.type?.[0]) {
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

  const options = ["formula", "breast milk"];

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
      <fetcher.Form method="post" action="/bottle-logger">
        <div className="mb-2 flex w-full flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="type" className="text-2xs">
              Type
            </label>
            <select
              className="rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-sm"
              name="type"
              id="type"
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {capitalizeStr(option)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="ml" className="text-2xs">
              Ml
            </label>
            <input
              className="rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-sm"
              type="number"
              min="0"
              name="ml"
              id="ml"
              value={inputMl}
              onChange={(e) => setInputMl(e.target.value)}
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
          className="mt-2 w-full cursor-pointer rounded-lg bg-yellow-200 p-2 transition-all hover:opacity-70"
        >
          {fetcher.state === "submitting" ? "Logging..." : "🍼 Bottle"}
        </button>
      </fetcher.Form>
    </div>
  );
}
