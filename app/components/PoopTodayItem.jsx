import { formatTime } from "../utils";
export default function PoopTodayItem({ log: poop }) {
  return (
    <div className="flex items-center justify-start">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>Poop</p>
        </div>
        <p>{poop.g} g</p>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p className="ml-12">{formatTime(poop.date)}</p>
      </div>
    </div>
  );
}
