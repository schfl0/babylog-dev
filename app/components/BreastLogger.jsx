import { useFetcher } from "react-router";
import { useState, useEffect } from "react";
import { formatTime, calculateDuration } from "../utils";

export default function BreastLogger({
  session,
  logger,
  openBreastLeft,
  openBreastRight,
}) {
  const leftBreast = useFetcher();
  const rightBreast = useFetcher();
  const deleteFetcher = useFetcher();
  const [isLeftFeeding, setIsLeftFeeding] = useState(!!openBreastLeft);
  const [isRightFeeding, setIsRightFeeding] = useState(!!openBreastRight);

  const [breastLeftStart, setBreastLeftStart] = useState(
    openBreastLeft?.start || null,
  );
  const [breastRightStart, setBreastRightStart] = useState(
    openBreastRight?.start || null,
  );
  const [breastLeftDuration, setBreastLeftDuration] = useState(null);
  const [breastRightDuration, setBreastRightDuration] = useState(null);

  useEffect(() => {
    if (openBreastLeft?.start) {
      setIsLeftFeeding(true);
      setBreastLeftStart(openBreastLeft.start);
      setBreastLeftDuration(calculateDuration(openBreastLeft.start));
    } else {
      setIsLeftFeeding(false);
      setBreastLeftStart(null);
      setBreastLeftDuration(null);
    }
  }, [openBreastLeft]);

  useEffect(() => {
    if (openBreastRight?.start) {
      setIsRightFeeding(true);
      setBreastRightStart(openBreastRight.start);
      setBreastRightDuration(calculateDuration(openBreastRight.start));
    } else {
      setIsRightFeeding(false);
      setBreastRightStart(null);
      setBreastRightDuration(null);
    }
  }, [openBreastRight]);

  useEffect(() => {
    if (!breastLeftStart) return;

    const interval = setInterval(() => {
      setBreastLeftDuration(calculateDuration(breastLeftStart));
    }, 1000);

    return () => clearInterval(interval);
  }, [breastLeftStart]);

  useEffect(() => {
    if (!breastRightStart) return;

    const interval = setInterval(() => {
      setBreastRightDuration(calculateDuration(breastRightStart));
    }, 1000);

    return () => clearInterval(interval);
  }, [breastRightStart]);

  return (
    <div className="text-2xs rounded-md border border-gray-200 p-4 shadow-md">
      <deleteFetcher.Form
        method="delete"
        action="/delete-logger"
        className="mb-2 flex justify-end"
      >
        <input type="hidden" name="deleteLogger" value={logger} />
        <button
          type="submit"
          className="cursor-pointer transition-all hover:opacity-50"
        >
          ❌
        </button>
      </deleteFetcher.Form>
      <div className="flex items-center justify-start gap-4">
        <leftBreast.Form
          method="post"
          action="/breastleft-logger"
          className="flex-1 p-2 shadow-sm"
        >
          <div className="mb-2">
            <input
              type="hidden"
              name="triggerBreastLeft"
              id="triggerBreastLeft"
              value={isLeftFeeding ? "stop" : "start"}
            />
            <div>
              <p className="mb-2 text-center font-bold">L</p>
              <p>
                🏁 Start:{" "}
                {breastLeftStart ? `${formatTime(breastLeftStart)}` : "--"}
              </p>
              <p>⏱️ Feeding: {breastLeftDuration || "--"}</p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded-sm bg-rose-50 p-2 transition-all hover:opacity-70"
          >
            🤱 {isLeftFeeding ? "End" : "Start"}
          </button>
        </leftBreast.Form>
        <rightBreast.Form
          method="post"
          action="/breastright-logger"
          className="flex-1 p-2 shadow-sm"
        >
          <div className="mb-2">
            <input
              type="hidden"
              name="triggerBreastRight"
              id="triggerBreastRight"
              value={isRightFeeding ? "stop" : "start"}
            />
            <div>
              <p className="mb-2 text-center font-bold">R</p>
              <p>
                🏁 Start:{" "}
                {breastRightStart ? `${formatTime(breastRightStart)}` : "--"}
              </p>
              <p>⏱️ Feeding: {breastRightDuration || "--"}</p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded-sm bg-rose-50 p-2 transition-all hover:opacity-70"
          >
            🤱 {isRightFeeding ? "End" : "Start"}
          </button>
        </rightBreast.Form>
      </div>
    </div>
  );
}
