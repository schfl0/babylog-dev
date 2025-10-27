import { formatTime, formatDate } from "../utils";
import { useFetcher } from "react-router";
import { useState } from "react";

export default function BottleItemEdit({ bottle }) {
  const fetcher = useFetcher();
  const [inputMl, setInputMl] = useState(bottle.ml);
  const [inputDate, setInputDate] = useState(formatDate(bottle.date));

  return (
    <fetcher.Form className="flex items-center justify-start">
      <div className="flex items-center justify-start gap-2">
        <label htmlFor="ml">ml:</label>
        <input
          className="w-14 rounded-sm border border-gray-400 px-1 py-0.5"
          type="number"
          name="ml"
          id="ml"
          value={inputMl}
          onChange={(e) => setInputMl(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-start gap-2">
        <label htmlFor="date">date:</label>
        <input
          className="w-20 rounded-sm border border-gray-400 px-1 py-0.5"
          type="text"
          name="date"
          id="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />
      </div>
    </fetcher.Form>
  );
}
