import { formatTime, formatISODate } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function TempItemEdit({ temp, setIsEdit }) {
  const fetcher = useFetcher();
  const [inputTemp, setInputTemp] = useState(temp.temp);
  const [inputDate, setInputDate] = useState(formatISODate(temp.date));
  const [inputTime, setInputTime] = useState(formatTime(temp.date));

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
      className="my-1 flex items-start justify-between gap-3 rounded-sm bg-red-100 px-1 py-1.5 text-[9px] shadow-md"
    >
      <input type="hidden" name="id" id="id" value={temp.id} />
      <div className="flex flex-col items-start">
        <div className="flex flex-col items-start">
          <label htmlFor="temp">Temp (°C):</label>
          <input
            className="w-10 rounded-sm border border-gray-400 bg-red-50 px-1 py-0.5"
            type="number"
            name="temp"
            id="temp"
            value={inputTemp}
            onChange={(e) => setInputTemp(e.target.value)}
          />
        </div>
        {fetcher?.data?.temp?.[0] && (
          <p className="mt-0.5 text-[9px] leading-none text-red-500">
            {fetcher.data.temp[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start">
        <div className="flex flex-col items-start">
          <label htmlFor="date">Date:</label>
          <input
            className="w-20 rounded-sm border border-gray-400 bg-red-50 px-1 py-0.5"
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
            className="w-15 rounded-sm border border-gray-400 bg-red-50 px-1"
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

      <div className="ml-auto flex items-center gap-1 self-center">
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
    </fetcher.Form>
  );
}
