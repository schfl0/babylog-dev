import { formatTime } from "../utils";
export default function MedTodayItem({ log: med }) {
  return (
    <div className="flex items-center justify-start">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>💊</p>
          <p>{med.med}</p>
        </div>
        <div className="flex items-center gap-1">
          <p>{med.quantity}</p>
          <p>{med.unit}</p>
        </div>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p>{formatTime(med.date)}</p>
      </div>
    </div>
  );
}
