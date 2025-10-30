import { useFetcher } from "react-router";
import { useState, useEffect } from "react";

export default function PoopLogger({ session, logger }) {
  const fetcher = useFetcher();
  const [inputPoop, setInputPoop] = useState("");
  useEffect(() => {
    if (fetcher.state === "idle") setInputG("");
  }, [fetcher.state]);

  const options = [
    "sm",
    "md",
    "lg",
    "xl",

  ];

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

      <fetcher.Form method="post" action="/poop-logger">
        <div className="mt-2 mb-2 flex items-center justify-center gap-2 text-xs">
          <label htmlFor="poop">Poop:</label>

          <select
            className="rounded-sm border px-2 py-1"
            name="poop"
            id="poop"
            value={inputPoop}
            onChange={(e) => setInputPoop(e.target.value)}
          >
            {options.map((option) => (
              <option key={option}>{option.toUpperCase()}</option>
            ))}
          </select>

        </div>
        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-sm bg-[#f6f0e8] p-2 transition-all hover:opacity-70"
        >
          💩 Poop
        </button>
      </fetcher.Form>
    </div>
  );
}
