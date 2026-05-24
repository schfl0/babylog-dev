import { useFetcher } from "react-router";
import { capitalizeStr, formatTime, formatDate } from "../utils";
import BottleItemEdit from "./BottleItemEdit";

export default function OverviewBottleAllItem({
  log: bottle,
  isEdit,
  setIsEdit,
}) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsEdit(bottle.id);
  }

  return (
    <div
      className={`text-xs hover:shadow-sm ${isEdit === bottle.id ? "my-1 rounded-md border border-gray-200 p-2" : ""}`}
    >
      <div className="flex items-center justify-start">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <p>🍼</p>
            <p>{capitalizeStr(bottle.type)}</p>
          </div>
          <p>{bottle.ml} ml</p>
        </div>
        <div className="flex min-w-25 items-center justify-end">
          <p className="ml-12">{formatTime(bottle.date)}</p>
        </div>
        <div className="ml-6 flex items-center justify-end">
          <p>{formatDate(bottle.date)}</p>
        </div>
        {isEdit !== bottle.id && (
          <>
            <button
              className="ml-2 cursor-pointer text-sm hover:opacity-60"
              onClick={handleClick}
            >
              📝
            </button>
            <fetcher.Form method="post" action="/delete-log" className="ml-1">
              <input type="hidden" name="id" id="id" value={bottle.id} />
              <input type="hidden" name="log" id="log" value={bottle.log} />
              <button className="cursor-pointer transition-all hover:opacity-60">
                🗑️
              </button>
            </fetcher.Form>
          </>
        )}
      </div>
      {isEdit === bottle.id && (
        <BottleItemEdit setIsEdit={setIsEdit} bottle={bottle} />
      )}
    </div>
  );
}
