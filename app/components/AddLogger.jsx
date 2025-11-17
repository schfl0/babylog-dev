import { useState, useEffect } from "react";
import { capitalizeStr } from "../utils";
import { useFetcher } from "react-router";
import { nonoptional } from "zod";

export default function AddLogger({ loggers }) {
  const fetcher = useFetcher();
  const options = [
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
    <fetcher.Form
      method="post"
      action="/add-logger"
      className="flex items-center justify-start gap-4"
    >
      <label htmlFor="addLogger">Add logger:</label>
      <select
        className="rounded-sm border px-2 py-1 text-xs"
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
        className="cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-sm text-white transition-all hover:opacity-60"
      >
        📝 Add
      </button>
    </fetcher.Form>
  );
}
