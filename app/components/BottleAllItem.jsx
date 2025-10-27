import { formatTime, formatDate } from "../utils";
import { useFetcher } from "react-router";

export default function BottleAllItem({ log: bottle }) {
  return (
    <div className="flex items-center justify-start">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>Bottle</p>
        </div>
        <p>{bottle.ml} ml</p>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p className="ml-12">{formatTime(bottle.date)}</p>
      </div>
      <div className="ml-6 flex items-center justify-end">
        <p>{formatDate(bottle.date)}</p>
      </div>
    </div>
  );
}
