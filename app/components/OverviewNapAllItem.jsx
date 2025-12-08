import { useFetcher } from "react-router";
import { getNapDuration, formatTime, formatDate } from "../utils";
import NapItemEdit from "../components/NapItemEdit";
export default function OverviewNapAllItem({
  log: nap,
  isEdit,
  setIsEdit,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsTodayEdit(false);
    setIsEdit(nap.id);
  }

  return (
    <>
      {isEdit === nap.id && !isTodayEdit ? (
        <NapItemEdit nap={nap} setIsEdit={setIsEdit} />
      ) : (
        <div className="flex items-center justify-start bg-blue-50 p-1 hover:shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <p>💤</p>
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
              🗑️
            </button>
          </fetcher.Form>
        </div>
      )}
    </>
  );
}
