import { formatTime, formatISODate } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function MedItemEdit({ med, setIsEdit }) {
  const fetcher = useFetcher();
  const [inputMed, setInputMed] = useState(med.med);
  const [inputG, setInputG] = useState(med.g);
  const [inputDate, setInputDate] = useState(formatISODate(med.date));
  const [inputTime, setInputTime] = useState(formatTime(med.date));

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
      action="/edit-med"
      className="my-1 flex max-w-full flex-wrap items-start justify-between gap-3 overflow-hidden rounded-sm bg-gray-100 px-2 py-2 text-[9px] shadow-md sm:flex-nowrap"
    >
      <input type="hidden" name="id" id="id" value={med.id} />
      <div className="flex min-w-[6rem] flex-shrink-0 flex-col items-start">
        <label htmlFor="med" className="font-medium">
          Med:
        </label>
        <input
          className="w-24 max-w-full truncate rounded-sm border border-gray-400 bg-gray-50 px-1 py-0.5 text-[9px]"
          type="text"
          name="med"
          id="med"
          value={inputMed}
          onChange={(e) => setInputMed(e.target.value)}
        />
        {fetcher?.data?.med?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.med[0]}
          </p>
        )}
      </div>

      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="g" className="font-medium">
          G:
        </label>
        <input
          className="w-10 max-w-full rounded-sm border border-gray-400 bg-gray-50 px-1 py-0.5 text-[9px]"
          type="number"
          name="g"
          id="g"
          value={inputG}
          onChange={(e) => setInputG(e.target.value)}
        />
        {fetcher?.data?.g?.[0] && (
          <p className="mt-0.5 text-[8px] leading-none text-red-500">
            {fetcher.data.g[0]}
          </p>
        )}
      </div>

      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="date" className="font-medium">
          Date:
        </label>
        <input
          className="w-20 max-w-full rounded-sm border border-gray-400 bg-gray-50 px-1 py-0.5 text-[9px]"
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

      <div className="flex flex-shrink-0 flex-col items-start">
        <label htmlFor="time" className="font-medium">
          Time:
        </label>
        <input
          className="w-15 max-w-full rounded-sm border border-gray-400 bg-gray-50 px-1 text-[9px]"
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

      <div className="ml-auto flex flex-shrink-0 items-center gap-1 self-center">
        <button
          type="submit"
          className="cursor-pointer text-sm transition-all hover:opacity-60"
        >
          ✅
        </button>
        <button
          type="button"
          className="cursor-pointer text-sm transition-all hover:opacity-60"
          onClick={() => setIsEdit(null)}
        >
          🚫
        </button>
      </div>
    </fetcher.Form>
  );
}
