import { formatTimeLocal, formatISODateLocal } from "../utils";
import { useFetcher } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function MedItemEdit({ med, setIsEdit }) {
  const fetcher = useFetcher();
  const [inputMed, setInputMed] = useState(med.med);
  const [inputUnit, setInputUnit] = useState(med.unit);
  const [inputQuantity, setInputQuantity] = useState(med.quantity);
  const [inputDate, setInputDate] = useState(formatISODateLocal(med.date));
  const [inputTime, setInputTime] = useState(formatTimeLocal(med.date));

  const prevState = useRef(fetcher.state);

  useEffect(() => {
    if (prevState.current === "loading" && fetcher.state === "idle") {
      setIsEdit(null);
    }
    prevState.current = fetcher.state;
  }, [fetcher.state]);

  const options = ["g", "mg", "mcg", "ng", "l", "ml", "drops", "u"];

  return (
    <fetcher.Form
      method="post"
      action="/edit-med"
      className="text-4xs my-1 flex w-full flex-col items-start justify-start gap-1 rounded-sm border border-gray-100 bg-gray-100 px-2 py-2"
    >
      <input type="hidden" name="id" id="id" value={med.id} />
      <div className="flex w-full items-center justify-start gap-2">
        <div className="flex flex-1 flex-col justify-start">
          <label htmlFor="med" className="font-medium">
            Med:
          </label>
          <input
            className="flex-1 rounded-sm border border-gray-400 bg-gray-50 px-1 py-0.5 text-[9px]"
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

        <div className="flex flex-col justify-start">
          <label htmlFor="unit" className="font-medium">
            Unit:
          </label>
          <select
            className="rounded-sm border border-gray-400 bg-gray-50 px-1 py-0.5"
            name="unit"
            id="unit"
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
          {fetcher?.data?.unit?.[0] && (
            <p className="mt-0.5 text-[8px] leading-none text-red-500">
              {fetcher.data.unit[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="quantity" className="font-medium">
            Quantity:
          </label>
          <input
            className="w-10 rounded-sm border border-gray-400 bg-gray-50 px-1 py-0.5 text-[9px]"
            type="number"
            name="quantity"
            id="quantity"
            value={inputQuantity}
            onChange={(e) => setInputQuantity(e.target.value)}
          />
          {fetcher?.data?.quantity?.[0] && (
            <p className="mt-0.5 text-[8px] leading-none text-red-500">
              {fetcher.data.quantity[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <div className="flex flex-col items-start">
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

          <div className="flex flex-col items-start">
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
          <input
            type="hidden"
            name="timezoneOffset"
            id="timezoneOffset"
            value={new Date().getTimezoneOffset()}
          />
        </div>

        <div className="flex items-center gap-1 self-center">
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
      </div>
    </fetcher.Form>
  );
}
