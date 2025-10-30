import { formatTime } from "../utils";
export default function PoopTodayItem({ log: poop }) {
  return (
    <div className="flex items-center justify-start bg-[#f6f0e8] p-1">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>💩</p>
          <p>Poop</p>
        </div>
        <p>{poop.poop}</p>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p className="ml-12">{formatTime(poop.date)}</p>
      </div>
    </div>
  );
}
