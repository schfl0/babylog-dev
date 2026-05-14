import { formatTimeLocal, formatISODateLocal } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function PoopItemEdit({ poop, setIsEdit }) {
  const fetcher = useFetcher();
  const [inputPoop, setInputPoop] = useState(poop.poop);
  const [inputDate, setInputDate] = useState(formatISODateLocal(poop.date));
  const [inputTime, setInputTime] = useState(formatTimeLocal(poop.date));

  const prevState = useRef(fetcher.state);

  useEffect(() => {
    if (prevState.current === "loading" && fetcher.state === "idle") {
      setIsEdit(null);
    }
    prevState.current = fetcher.state;
  }, [fetcher.state]);

  const options = ["sm", "md", "lg", "xl"];

  return (
    <fetcher.Form
      method="post"
      action="/edit-poop"
      className="text-3xs mt-1 flex w-full flex-col items-start gap-1 border-t border-gray-300 pt-1"
    >
      <input type="hidden" name="id" id="id" value={poop.id} />
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="poop" className="font-medium">
            Poop
          </label>
          <select
            className="rounded-sm border border-gray-400 bg-[#f6f0e8] px-1 py-0.5"
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
          {fetcher?.data?.poop?.[0] && (
            <p className="mt-0.5 text-[8px] leading-none text-red-500">
              {fetcher.data.poop[0]}
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
            onClick={() => setIsEdit(null)}
          >
            🚫
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="date" className="font-medium">
          Date
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-[#f6f0e8] px-1 py-0.5"
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
        <label htmlFor="time" className="font-medium">
          Time
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-[#f6f0e8] px-1"
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
