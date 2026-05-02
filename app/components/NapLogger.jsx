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
    <div className="rounded-md border border-gray-200 p-4 text-sm shadow-md">
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
        <div className="mt-2 mb-2">
          <input
            type="hidden"
            name="triggerNap"
            id="triggerNap"
            value={isSleeping ? "stop" : "start"}
          />
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-start justify-center">
              <p className="text-2xs">🏁 Start</p>
              <p>{napStart ? `${formatTime(napStart)}` : "--:--"}</p>
            </div>
            <div>
              <p className="text-2xs">⏱️ Nap</p>
              <p>{napDuration || "--:--:--"}</p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-sm bg-violet-100 p-2 transition-all hover:opacity-70"
        >
          💤 {isSleeping ? "End" : "Start"} nap
        </button>
      </fetcher.Form>
    </div>
  );
}
