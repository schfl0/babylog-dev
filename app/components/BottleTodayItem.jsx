import { formatTime } from "../utils";
export default function BottleTodayItem({ log: bottle }) {
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
    </div>
  );
}
