import { useState, useEffect } from "react";
import { capitalizeStr } from "../utils";
import { useFetcher } from "react-router";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SelectAllView({ allView }) {
  const fetcher = useFetcher();
  const options = [
    "overview",
    "bottles",
    "foods",
    "naps",
    "poops",
    "temperature",
    "medication",
    "breastfeedings",
  ];

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data !== undefined) {
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <fetcher.Form
      method="post"
      action="/select-allview"
      className="flex items-center justify-start gap-2"
    >
      <select
        className="rounded-lg border border-white/30 bg-white/30 p-2 backdrop-blur-sm"
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
        className="cursor-pointer rounded-full bg-pink-600 px-3 py-1.5 text-white transition-all hover:opacity-60"
      >
        <FaMagnifyingGlass />
      </button>
    </fetcher.Form>
  );
}
