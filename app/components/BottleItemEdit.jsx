import { capitalizeStr, formatISODateLocal, formatTimeLocal } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function BottleItemEdit({ bottle, setIsEdit }) {
  const fetcher = useFetcher();
  const [inputType, setInputType] = useState(bottle.type);
  const [inputMl, setInputMl] = useState(bottle.ml);
  const [inputDate, setInputDate] = useState(formatISODateLocal(bottle.date));
  const [inputTime, setInputTime] = useState(formatTimeLocal(bottle.date));

  const prevState = useRef(fetcher.state);
  useEffect(() => {
    if (prevState.current === "loading" && fetcher.state === "idle") {
      setIsEdit(null);
    }
    prevState.current = fetcher.state;
  }, [fetcher.state]);

  const options = ["formula", "breast milk"];

  return (
    <fetcher.Form
      method="post"
      action="/edit-bottle"
      className="text-3xs mt-1 flex w-full flex-col items-start gap-1 border-t border-gray-300 pt-1"
    >
      <input type="hidden" name="id" id="id" value={bottle.id} />
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="type">Type</label>
          <select
            className="rounded-sm border border-gray-400 bg-yellow-50 px-1 py-0.5"
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
          {fetcher?.data?.bottle?.[0] && (
            <p className="mt-0.5 text-[8px] leading-none text-red-500">
              {fetcher.data.bottle[0]}
            </p>
          )}
        </div>
        <div className="mt-1 flex gap-2 text-sm">
          <button
            type="submit"
            className="cursor-pointer transition-all hover:opacity-60"
          >
            ✅
          </button>
          <button
            type="button"
            className="cursor-pointer transition-all hover:opacity-60"
            onClick={() => {
              setIsEdit(null);
            }}
          >
            🚫
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="ml">ml</label>
        <input
          className="rounded-sm border border-gray-400 bg-yellow-50 px-1 py-0.5"
          type="number"
          name="ml"
          id="ml"
          value={inputMl}
          onChange={(e) => setInputMl(e.target.value)}
        />
        {fetcher?.data?.ml?.[0] && (
          <p className="mt-0.5 text-[9px] leading-none text-red-500">
            {fetcher.data.ml[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="date">Date</label>
        <input
          className="rounded-sm border border-gray-400 bg-yellow-50 px-1 py-0.5"
          type="date"
          name="date"
          id="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />
        {fetcher?.data?.date?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.date[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="time">Time</label>
        <input
          className="rounded-sm border border-gray-400 bg-yellow-50 px-1"
          type="time"
          name="time"
          id="time"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        {fetcher?.data?.time?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.time[0]}
          </p>
        )}
      </div>
      <input
        type="hidden"
        name="timezoneOffset"
        id="timezoneOffset"
        value={new Date().getTimezoneOffset()}
      />
    </fetcher.Form>
  );
}
