import { useFetcher, useLoaderData } from "react-router";
import { useEffect } from "react";
import { formatTime } from "../utils";
import BottleItemEdit from "../components/BottleItemEdit";

export default function BottleTodayItem({ log: bottle, isEdit, setIsEdit }) {
  const fetcher = useFetcher();

  function handleClick() {
    if (!isEdit) setIsEdit(bottle.id);
    return;
  }

  return (
    <>
      {isEdit === bottle.id ? (
        <BottleItemEdit bottle={bottle} setIsEdit={setIsEdit} />
      ) : (
        <div className="flex items-center justify-start hover:shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <p>Bottle</p>
            </div>
            <p>{bottle.ml} ml</p>
          </div>
          <div className="flex min-w-25 items-center justify-end">
            <p className="ml-12">{formatTime(bottle.date)}</p>
          </div>
          <button
            className="ml-2 cursor-pointer hover:opacity-60"
            onClick={handleClick}
          >
            📝
          </button>
          <fetcher.Form method="post" action="/delete-bottle" className="ml-1">
            <input type="hidden" name="id" id="id" value={bottle.id} />
            <input type="hidden" name="log" id="log" value={bottle.log} />
            <button className="cursor-pointer transition-all hover:opacity-60">
              ❌
            </button>
          </fetcher.Form>
        </div>
      )}
    </>
  );
}
