import { useFetcher } from "react-router";
import { useState, useEffect } from "react";
import { formatTime, calculateDuration } from "../utils";

export default function NapLogger({ session, logger, openNap }) {
  const fetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const [isSleeping, setIsSleeping] = useState(!!openNap);

  const [napStart, setNapStart] = useState(openNap?.start || null);
  const [napDuration, setNapDuration] = useState(null);

  useEffect(() => {
    if (openNap?.start) {
      setIsSleeping(true);
      setNapStart(openNap.start);
      setNapDuration(calculateDuration(openNap.start));
    } else {
      setIsSleeping(false);
      setNapStart(null);
      setNapDuration(null);
    }
  }, [openNap]);

  useEffect(() => {
    if (!napStart) return;

    const interval = setInterval(() => {
      setNapDuration(calculateDuration(napStart));
    }, 1000);

    return () => clearInterval(interval);
  }, [napStart]);

  return (
    <div className="rounded-md px-2 py-4 shadow-md">
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

      <fetcher.Form method="post" action="/nap-logger">
        <div className="mt-2 mb-2 text-xs">
          <input
            className="w- border border-gray-400 px-1 py-0.5"
            type="hidden"
            name="triggerNap"
            id="triggerNap"
            value={isSleeping ? "stop" : "start"}
          />
          <div className="itens-center flex justify-center gap-2">
            <p>🏁 Start: {napStart ? `${formatTime(napStart)}` : "--"}</p>
            <p>/</p>
            <p>⏱️ Nap: {napDuration || "--"}</p>
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-sm bg-blue-100 p-2 transition-all hover:opacity-70"
        >
          💤 {isSleeping ? "End" : "Start"} nap
        </button>
      </fetcher.Form>
    </div>
  );
}
