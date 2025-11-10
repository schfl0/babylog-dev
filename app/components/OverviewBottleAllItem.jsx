import { useFetcher } from "react-router";
import { formatTime, formatDate } from "../utils";
export default function OverviewBottleAllItem({ log: bottle }) {
  const fetcher = useFetcher();

  function handleClick() {
    if (!isEdit) setIsEdit(bottle.id);
    return;
  }

  return (
    <div className="flex items-center justify-start bg-yellow-50 p-1">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <p>🍼</p>
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
      <button
        className="ml-2 cursor-pointer hover:opacity-60"
        onClick={handleClick}
      >
        📝
      </button>
      <fetcher.Form method="post" action="/delete-log" className="ml-1">
        <input type="hidden" name="id" id="id" value={bottle.id} />
        <input type="hidden" name="log" id="log" value={bottle.log} />
        <button className="cursor-pointer transition-all hover:opacity-60">
          ❌
        </button>
      </fetcher.Form>
    </div>
  );
}
