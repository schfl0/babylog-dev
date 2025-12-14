import { capitalizeStr, formatISODateLocal, formatTimeLocal } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function BottleItemEdit({ bottle, setIsEdit }) {
  const fetcher = useFetcher();
  const [inputType, setInputType] = useState(bottle.type);
  const [inputMl, setInputMl] = useState(bottle.ml);
  const [inputDate, setInputDate] = useState(formatISODateLocal(bottle.date));
  const [inputTime, setInputTime] = useState(formatTimeLocal(bottle.date));

  console.log(bottle.type);

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
      className="text-4xs my-1 flex flex-col items-start justify-between gap-1 rounded-sm border border-gray-100 bg-yellow-100 px-1 py-1.5 shadow-sm"
    >
      <input type="hidden" name="id" id="id" value={bottle.id} />
      <div className="flex items-center justify-start gap-2">
        <div className="flex flex-shrink-0 flex-col items-start">
          <label htmlFor="type" className="font-medium">
            Type:
          </label>
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
          {fetcher?.data?.poop?.[0] && (
            <p className="mt-0.5 text-[8px] leading-none text-red-500">
              {fetcher.data.poop[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start">
            <label htmlFor="ml">Ml:</label>
            <input
              className="w-20 rounded-sm border border-gray-400 bg-yellow-50 px-1 py-0.5"
              type="number"
              name="ml"
              id="ml"
              value={inputMl}
              onChange={(e) => setInputMl(e.target.value)}
            />
          </div>
          {fetcher?.data?.ml?.[0] && (
            <p className="mt-0.5 text-[9px] leading-none text-red-500">
              {fetcher.data.ml[0]}
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="justfiy-start flex items-center gap-2">
          <div className="flex flex-col items-start">
            <div className="flex flex-col items-start">
              <label htmlFor="date">Date:</label>
              <input
                className="w-25 rounded-sm border border-gray-400 bg-yellow-50 px-1 py-0.5"
                type="date"
                name="date"
                id="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>
            {fetcher?.data?.date?.[0] && (
              <p className="mt-0.5 text-[8px] leading-none text-red-500">
                {fetcher.data.date[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start">
            <div className="flex flex-col items-start">
              <label htmlFor="time">Time:</label>
              <input
                className="w-25 rounded-sm border border-gray-400 bg-yellow-50 px-1"
                type="time"
                name="time"
                id="time"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
              />
            </div>
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
        </div>
        <div className="flex items-center gap-1">
          <button
            type="submit"
            className="cursor-pointer text-xs transition-all hover:opacity-60"
          >
            ✅
          </button>
          <button
            type="button"
            className="cursor-pointer text-xs transition-all hover:opacity-60"
            onClick={() => setIsEdit(null)}
          >
            🚫
          </button>
        </div>
      </div>
    </fetcher.Form>
  );
}
