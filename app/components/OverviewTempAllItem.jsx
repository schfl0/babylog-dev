import { useFetcher } from "react-router";
import { formatTime, formatDate } from "../utils";
import TempItemEdit from "../components/TempItemEdit";
export default function OverviewTempAllItem({
  log: temp,
  isEdit,
  setIsEdit,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsTodayEdit(false);
    setIsEdit(temp.id);
  }

  return (
    <>
      {isEdit === temp.id && !isTodayEdit ? (
        <TempItemEdit temp={temp} setIsEdit={setIsEdit} />
      ) : (
        <div className="flex items-center justify-start bg-red-50 p-1 hover:shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <p>🌡️</p>
              <p>Temp</p>
            </div>
            <p>{temp.temp} °C</p>
          </div>
          <div className="flex min-w-25 items-center justify-end">
            <p className="ml-4">{formatTime(temp.date)}</p>
          </div>
          <div className="ml-6 flex items-center justify-end">
            <p>{formatDate(temp.date)}</p>
          </div>
          <button
            className="ml-2 cursor-pointer hover:opacity-60"
            onClick={handleClick}
          >
            📝
          </button>
          <fetcher.Form method="post" action="/delete-log" className="ml-1">
            <input type="hidden" name="id" id="id" value={temp.id} />
            <input type="hidden" name="log" id="log" value={temp.log} />
            <button className="cursor-pointer transition-all hover:opacity-60">
              ❌
            </button>
          </fetcher.Form>
        </div>
      )}
    </>
  );
}
