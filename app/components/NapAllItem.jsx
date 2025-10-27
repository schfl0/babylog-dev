import { getNapDuration, formatTime, formatDate } from "../utils";
export default function NapAllItem({ log: nap }) {
  return (
    <div className="flex items-center justify-start">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>Nap</p>
        </div>
        <p>{getNapDuration(nap)}</p>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p className="ml-4">{formatTime(nap.start)}</p>-
        <p>{formatTime(nap.stop)}</p>
      </div>
      <div className="ml-6 flex items-center justify-end">
        <p>{formatDate(nap.start)}</p>
      </div>
    </div>
  );
}
