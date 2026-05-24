import { useFetcher } from "react-router";
import { useState, useEffect } from "react";

export default function PoopLogger({ session, logger }) {
  const fetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const [inputPoop, setInputPoop] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle") setInputPoop("");
  }, [fetcher.state]);

  const options = ["sm", "md", "lg", "xl"];

  useEffect(() => {
    if (fetcher.data?.poop?.[0]) {
      setErrorMsg(fetcher.data.poop[0]);
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
    <div className="rounded-md border border-gray-200 p-4 shadow-md">
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

      <fetcher.Form method="post" action="/poop-logger">
        <div className="mb-2 flex flex-col gap-2">
          <div className="flex w-full flex-col">
            <label htmlFor="poop" className="text-3xs md:text-2xs">
              Size
            </label>
            <select
              className="rounded-sm border border-gray-300 px-2 py-0.5"
              name="poop"
              id="poop"
              value={inputPoop}
              onChange={(e) => setInputPoop(e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option.toUpperCase()}
                </option>
              ))}
            </select>
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
          className="mt-2 w-full cursor-pointer rounded-sm bg-[#eed0b4] p-2 transition-all hover:opacity-70"
        >
          {fetcher.state === "submitting" ? "Logging..." : "💩 Poop"}
        </button>
      </fetcher.Form>
    </div>
  );
}
