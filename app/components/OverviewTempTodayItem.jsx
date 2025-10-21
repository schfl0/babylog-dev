import { formatTime } from "../utils";

export default function OverviewTempTodayItem({ log: temp }) {
  return (
    <div className="flex items-center justify-start bg-red-50 p-1">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>🌡️</p>
          <p>Temp</p>
        </div>
        <p>{temp.temp} °C</p>
      </div>
      <div className="flex min-w-25 items-center justify-end">
        <p className="ml-12">{formatTime(temp.date)}</p>
      </div>
    </div>
  );
}
