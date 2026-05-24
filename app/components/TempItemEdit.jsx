import { formatTimeLocal, formatISODateLocal } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function TempItemEdit({ temp, setIsEdit }) {
  const fetcher = useFetcher();
  const [inputTemp, setInputTemp] = useState(temp.temp);
  const [inputDate, setInputDate] = useState(formatISODateLocal(temp.date));
  const [inputTime, setInputTime] = useState(formatTimeLocal(temp.date));

  const prevState = useRef(fetcher.state);

  useEffect(() => {
    if (prevState.current === "loading" && fetcher.state === "idle") {
      setIsEdit(null);
    }
    prevState.current = fetcher.state;
  }, [fetcher.state]);

  return (
    <fetcher.Form
      method="post"
      action="/edit-temp"
      className="text-2xs mt-1 flex w-full flex-col items-start gap-1 border-t border-gray-300 pt-1"
    >
      <input type="hidden" name="id" id="id" value={temp.id} />
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="temp" className="text-3xs">
            °C
          </label>
          <input
            className="rounded-sm border border-gray-400 bg-red-50 px-1 py-0.5"
            type="number"
            name="temp"
            id="temp"
            value={inputTemp}
            onChange={(e) => setInputTemp(e.target.value)}
          />
          {fetcher?.data?.temp?.[0] && (
            <p className="mt-0.5 text-[9px] leading-none text-red-500">
              {fetcher.data.temp[0]}
            </p>
          )}
        </div>
        <div className="ml-auto flex items-center gap-1 self-center text-sm">
          <button
            type="submit"
            className="cursor-pointer transition-all hover:opacity-60"
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

      <div className="flex flex-col gap-0.5">
        <label htmlFor="date" className="text-3xs">
          Date
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-red-50 px-1 py-0.5"
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
        <label htmlFor="time" className="text-3xs">
          Time
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-red-50 px-1"
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
