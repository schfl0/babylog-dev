import { useState, useEffect } from "react";
import { capitalizeStr } from "../utils";
import { useFetcher } from "react-router";

export default function SelectAllView({ allView }) {
  const fetcher = useFetcher();
  const options = [
    "overview",
    "bottles",
    "foods",
    "naps",
    "poops",
    "temps",
    "meds",
  ];

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data !== undefined) {
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <fetcher.Form
      method="post"
      action="/select-allview"
      className="flex items-center justify-start gap-4"
    >
      <label htmlFor="selectAllView">Select view:</label>
      <select
        className="rounded-sm border px-2 py-1"
        name="selectAllView"
        id="selectAllView"
        defaultValue={allView}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {capitalizeStr(option)}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-sm text-white transition-all hover:opacity-60"
      >
        🔎 Select
      </button>
    </fetcher.Form>
  );
}
