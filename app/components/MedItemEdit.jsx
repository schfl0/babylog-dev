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
      className="text-3xs mt-1 flex w-full flex-col items-start gap-1 border-t border-gray-300 pt-1"
    >
      <input type="hidden" name="id" id="id" value={med.id} />
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="med" className="font-medium">
            Medication
          </label>
          <input
            className="rounded-sm border border-gray-400 bg-gray-50 px-1 py-0.5"
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

      <div className="flex flex-col gap-0.5">
        <label htmlFor="unit" className="font-medium">
          Unit
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

      <div className="flex flex-col gap-0.5">
        <label htmlFor="quantity" className="font-medium">
          Dose
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-gray-50 px-1 py-0.5"
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

      <div className="flex flex-col gap-0.5">
        <label htmlFor="date" className="font-medium">
          Date
        </label>
        <input
          className="rounded-sm border border-gray-400 bg-gray-50 px-1 py-0.5"
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
          className="rounded-sm border border-gray-400 bg-gray-50 px-1"
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
