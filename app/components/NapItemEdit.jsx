import { formatTime, formatISODate } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function NapItemEdit({ nap, setIsEdit }) {
  const fetcher = useFetcher();
  const [inputStartDate, setInputStartDate] = useState(
    formatISODate(nap.start),
  );
  const [inputStartTime, setInputStartTime] = useState(formatTime(nap.start));
  const [inputStopDate, setInputStopDate] = useState(formatISODate(nap.stop));
  const [inputStopTime, setInputStopTime] = useState(formatTime(nap.stop));

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
      action="/edit-nap"
      className="my-1 flex max-w-full flex-wrap items-start justify-between gap-3 overflow-hidden rounded-sm bg-blue-100 px-2 py-2 text-[9px] shadow-md sm:flex-nowrap"
    >
      <input type="hidden" name="id" id="id" value={nap.id} />

      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="startDate" className="font-medium">
          Start date:
        </label>
        <input
          className="w-20 max-w-full rounded-sm border border-gray-400 bg-blue-50 px-1 py-0.5 text-[9px]"
          type="date"
          name="startDate"
          id="startDate"
          value={inputStartDate}
          onChange={(e) => setInputStartDate(e.target.value)}
        />
        {fetcher?.data?.startDate?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.startDate[0]}
          </p>
        )}
      </div>

      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="startTime" className="font-medium">
          Start time:
        </label>
        <input
          className="w-15 max-w-full rounded-sm border border-gray-400 bg-blue-50 px-1 text-[9px]"
          type="time"
          name="startTime"
          id="startTime"
          value={inputStartTime}
          onChange={(e) => setInputStartTime(e.target.value)}
        />
        {fetcher?.data?.startTime?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.startTime[0]}
          </p>
        )}
      </div>

      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="stopDate" className="font-medium">
          Stop date:
        </label>
        <input
          className="w-20 max-w-full rounded-sm border border-gray-400 bg-blue-50 px-1 py-0.5 text-[9px]"
          type="date"
          name="stopDate"
          id="stopDate"
          value={inputStopDate}
          onChange={(e) => setInputStopDate(e.target.value)}
        />
        {fetcher?.data?.stopDate?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.stopDate[0]}
          </p>
        )}
      </div>

      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="stopTime" className="font-medium">
          Stop time:
        </label>
        <input
          className="w-15 max-w-full rounded-sm border border-gray-400 bg-blue-50 px-1 text-[9px]"
          type="time"
          name="stopTime"
          id="stopTime"
          value={inputStopTime}
          onChange={(e) => setInputStopTime(e.target.value)}
        />
        {fetcher?.data?.stopTime?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.stopTime[0]}
          </p>
        )}
      </div>

      <div className="ml-auto flex flex-shrink-0 items-center gap-1 self-center">
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
