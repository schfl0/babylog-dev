import { formatTime } from "../utils";
export default function MedTodayItem({ log: med }) {
  return (
    <div className="flex items-center justify-start bg-neutral-50 p-1">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>💊</p>
          <p>{med.med}</p>
        </div>
        <p>{med.g} g</p>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p>{formatTime(med.date)}</p>
      </div>
    </div>
  );
}
