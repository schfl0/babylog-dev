import { formatTime, formatDate } from "../utils";

export default function OverviewMedAllItem({ log: med }) {
  return (
    <div className="flex items-center justify-start bg-yellow-50 p-1">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>💊</p>
          <p>{med.med}</p>
        </div>
        <p>{med.g} g</p>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p className="ml-4">{formatTime(med.date)}</p>
      </div>
      <div className="ml-6 flex items-center justify-end">
        <p>{formatDate(med.date)}</p>
      </div>
    </div>
  );
}
