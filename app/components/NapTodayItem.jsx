import { getNapDuration, formatTime } from "../utils";
import { useFetcher } from "react-router";
import { useEffect } from "react";
import NapItemEdit from "../components/NapItemEdit";

export default function NapTodayItem({
  log: nap,
  isEdit,
  setIsEdit,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsEdit(nap.id);
    setIsTodayEdit(true);
  }

  return (
    <>
      {isEdit === nap.id && isTodayEdit ? (
        <NapItemEdit nap={nap} setIsEdit={setIsEdit} />
      ) : (
        <div className="flex items-center justify-start hover:shadow-sm">
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
          <button
            className="ml-2 cursor-pointer hover:opacity-60"
            onClick={handleClick}
          >
            📝
          </button>
          <fetcher.Form method="post" action="/delete-log" className="ml-1">
            <input type="hidden" name="id" id="id" value={nap.id} />
            <input type="hidden" name="log" id="log" value={nap.log} />
            <button className="cursor-pointer transition-all hover:opacity-60">
              ❌
            </button>
          </fetcher.Form>
        </div>
      )}
    </>
  );
}
