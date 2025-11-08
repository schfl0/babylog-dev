import { useState, useEffect } from "react";
import { capitalizeStr } from "../utils";
import { useFetcher } from "react-router";

export default function AddLogger({ loggers }) {
  const fetcher = useFetcher();
  const options = ["bottle", "food", "nap", "poop", "temp", "med"];
  const [selectedLogger, setSelectedLogger] = useState(options[0]);

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
        className="rounded-sm border px-2 py-1"
        name="addLogger"
        id="addLogger"
        value={selectedLogger}
        onChange={(e) => setSelectedLogger(e.target.value)}
      >
        {options.map((option) => {
          if (!loggers.includes(option)) {
            return (
              <option key={option} value={option}>
                {capitalizeStr(option)}
              </option>
            );
          }
        })}
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
