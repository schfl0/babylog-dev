import { formatTime, formatDate } from "../utils";

export default function MedAllItem({ log: med }) {
  return (
    <div className="flex items-center justify-start">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>{med.med}</p>
        </div>
        <div className="flex items-center gap-1">
          <p>{med.quantity}</p>
          <p>{med.unit}</p>
        </div>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p className="ml-12">{formatTime(med.date)}</p>
      </div>
      <div className="ml-6 flex items-center justify-end">
        <p>{formatDate(med.date)}</p>
      </div>
    </div>
  );
}
