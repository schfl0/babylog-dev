import { useFetcher } from "react-router";
import { useState, useEffect } from "react";

export default function MedLogger({ session, logger }) {
  const fetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const [inputMed, setInputMed] = useState("");
  const [inputUnit, setInputUnit] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle") {
      setInputMed("");
      setInputUnit("");
      setInputQuantity("");
    }
  }, [fetcher.state]);

  useEffect(() => {
    if (
      fetcher.data?.med?.[0] ||
      fetcher.data?.unit?.[0] ||
      fetcher.data?.quantity?.[0]
    ) {
      setErrorMsg(
        Object.values(fetcher?.data).flat().filter(Boolean).join(" "),
      );
      const timer = setTimeout(() => setErrorMsg(""), 1000);
      return () => clearTimeout(timer);
    }
    if (fetcher.data?.success) {
      setSuccessMsg("Success!");
      const timer = setTimeout(() => setSuccessMsg(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.data]);

  const options = ["g", "mg", "mcg", "ng", "l", "ml", "drops", "u"];

  return (
    <div className="rounded-md border border-gray-200 p-4 shadow-md">
      <deleteFetcher.Form
        method="delete"
        action="/delete-logger"
        className="flex justify-end"
      >
        <input type="hidden" name="deleteLogger" value={logger} />
        <button
          type="submit"
          className="cursor-pointer transition-all hover:opacity-50"
        >
          ❌
        </button>
      </deleteFetcher.Form>

      <fetcher.Form method="post" action="/med-logger">
        <div className="mb-2 flex w-full flex-col gap-2">
          <div className="flex w-full flex-col">
            <label htmlFor="med" className="text-3xs md:text-2xs">
              Medication
            </label>
            <input
              className="rounded-sm border border-gray-300 px-1 py-0.5"
              type="text"
              name="med"
              id="med"
              value={inputMed}
              onChange={(e) => setInputMed(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="unit" className="text-3xs md:text-2xs">
              Unit
            </label>
            <select
              className="rounded-sm border border-gray-300 px-2 py-0.5"
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
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="quantity" className="text-3xs md:text-2xs">
              Dose
            </label>
            <input
              className="w-20 rounded-sm border border-gray-300 px-1 py-0.5"
              type="number"
              name="quantity"
              id="quantity"
              value={inputQuantity}
              onChange={(e) => setInputQuantity(e.target.value)}
            />
          </div>
        </div>
        {errorMsg && (
          <p className="mt-0.5 text-center text-[9px] opacity-50">
            🚫 {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="mt-0.5 text-center text-[9px] opacity-50">
            ✅ {successMsg}
          </p>
        )}

        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-sm bg-gray-200 p-2 transition-all hover:opacity-70"
        >
          {fetcher.state === "submitting" ? "Logging..." : "💊 Medication"}
        </button>
      </fetcher.Form>
    </div>
  );
}
