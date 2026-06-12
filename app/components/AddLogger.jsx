import { useState, useEffect } from "react";
import { capitalizeStr } from "../utils";
import { useFetcher } from "react-router";
import { nonoptional } from "zod";

export default function AddLogger({ loggers }) {
  const fetcher = useFetcher();
  const options = [
    "breastfeedings",
    "bottles",
    "foods",
    "naps",
    "poops",
    "temperature",
    "medication",
  ];
  const [selectedLogger, setSelectedLogger] = useState(options[0]);
  const availableOptions = options.filter(
    (option) => !loggers.includes(option),
  );
  const noOptionsLeft = availableOptions.length === 0;

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data !== undefined) {
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <>
      <h1 className="mb-2 font-bold">Add logger</h1>
      <fetcher.Form
        method="post"
        action="/add-logger"
        className="flex items-center justify-start gap-2"
      >
        <select
          className="rounded-lg border border-white/30 bg-white/30 p-2 backdrop-blur-sm"
          name="addLogger"
          id="addLogger"
          value={noOptionsLeft ? "" : selectedLogger}
          onChange={(e) => setSelectedLogger(e.target.value)}
          disabled={noOptionsLeft}
        >
          {noOptionsLeft ? (
            <option value="">---</option>
          ) : (
            availableOptions.map((option) => (
              <option key={option} value={option}>
                {capitalizeStr(option)}
              </option>
            ))
          )}
        </select>
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-pink-600 px-3 py-1 text-white transition-all hover:opacity-60"
        >
          📝
        </button>
      </fetcher.Form>
    </>
  );
}
