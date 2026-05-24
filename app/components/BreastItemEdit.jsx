import { capitalizeStr, formatTimeLocal, formatISODateLocal } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function BreastItemEdit({ breast, setIsEdit }) {
  const fetcher = useFetcher();

  const [inputPosition, setInputPosition] = useState(breast.position);
  const [inputStartDate, setInputStartDate] = useState(
    formatISODateLocal(breast.start),
  );
  const [inputStartTime, setInputStartTime] = useState(
    formatTimeLocal(breast.start),
  );
  const [inputStopDate, setInputStopDate] = useState(
    formatISODateLocal(breast.stop),
  );
  const [inputStopTime, setInputStopTime] = useState(
    formatTimeLocal(breast.stop),
  );

  const prevState = useRef(fetcher.state);

  useEffect(() => {
    if (prevState.current === "loading" && fetcher.state === "idle") {
      setIsEdit(null);
    }
    prevState.current = fetcher.state;
  }, [fetcher.state]);

  const options = ["l", "r"];

  return (
    <fetcher.Form
      method="post"
      action="/edit-breast"
      className="text-2xs mt-1 flex w-full flex-col items-start gap-1 border-t border-gray-300 pt-1"
    >
      <input type="hidden" name="id" id="id" value={breast.id} />
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="position" className="text-3xs">
            Position
          </label>
          <select
            className="rounded-sm border border-gray-400 bg-pink-50 px-1 py-0.5"
            name="position"
            id="position"
            value={inputPosition}
            onChange={(e) => setInputPosition(e.target.value)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {capitalizeStr(option)}
              </option>
            ))}
          </select>

          {fetcher?.data?.startDate?.[0] && (
            <p className="mt-0.5 text-[8px] leading-none text-red-500">
              {fetcher.data.startDate[0]}
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
        <label htmlFor="startDate" className="text-3xs">
          Start date
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-pink-50 px-1 py-0.5"
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

      <div className="flex flex-col gap-0.5">
        <label htmlFor="startTime" className="text-3xs">
          Start time
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-pink-50 px-1"
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

      <div className="flex flex-col gap-0.5">
        <label htmlFor="stopDate" className="text-3xs">
          Stop date
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-pink-50 px-1 py-0.5"
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

      <div className="flex flex-col gap-0.5">
        <label htmlFor="stopTime" className="text-3xs">
          Stop time
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-pink-50 px-1"
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
      <input
        type="hidden"
        name="timezoneOffset"
        id="timezoneOffset"
        value={new Date().getTimezoneOffset()}
      />
    </fetcher.Form>
  );
}
