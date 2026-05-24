import { capitalizeStr, getNapDuration, formatTime } from "../utils";
import { useFetcher } from "react-router";
import { useEffect } from "react";
import BreastItemEdit from "../components/BreastItemEdit";

export default function BreastTodayItem({ log: breast, isEdit, setIsEdit }) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsEdit(breast.id);
  }

  return (
    <div
      className={`text-2xs hover:shadow-sm md:text-xs ${isEdit === breast.id ? "my-1 rounded-md border border-gray-200 p-2" : ""}`}
    >
      <div className="flex items-center justify-start">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <p>{capitalizeStr(breast.position)}</p>
          </div>
          <p>{getNapDuration(breast)}</p>
        </div>
        <div className="flex min-w-25 items-center justify-end">
          <p className="ml-4">{formatTime(breast.start)}</p>-
          <p>{formatTime(breast.stop)}</p>
        </div>
        {isEdit !== breast.id && (
          <>
            <button
              className="ml-2 cursor-pointer hover:opacity-60"
              onClick={handleClick}
            >
              📝
            </button>
            <fetcher.Form method="post" action="/delete-log" className="ml-1">
              <input type="hidden" name="id" id="id" value={breast.id} />
              <input type="hidden" name="log" id="log" value={breast.log} />
              <button className="cursor-pointer transition-all hover:opacity-60">
                🗑️
              </button>
            </fetcher.Form>
          </>
        )}
      </div>
      {isEdit === breast.id && (
        <BreastItemEdit setIsEdit={setIsEdit} breast={breast} />
      )}
    </div>
  );
}
