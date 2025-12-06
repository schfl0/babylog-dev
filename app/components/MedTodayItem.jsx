import { useFetcher } from "react-router";
import { formatTime } from "../utils";
import MedItemEdit from "../components/MedItemEdit";

export default function MedTodayItem({
  log: med,
  isEdit,
  setIsEdit,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsTodayEdit(true);
    setIsEdit(med.id);
  }

  return (
    <>
      {isEdit === med.id && isTodayEdit ? (
        <MedItemEdit med={med} setIsEdit={setIsEdit} />
      ) : (
        <div className="flex items-center justify-start hover:shadow-md">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <p>{med.med}</p>
            </div>
            <div className="flex items-center gap-1">
              <p>{med.quantity}</p>
              <p>{med.unit}</p>
            </div>
          </div>
          <div className="flex min-w-25 items-center justify-end">
            <p>{formatTime(med.date)}</p>
          </div>
          <button
            className="ml-2 cursor-pointer hover:opacity-60"
            onClick={handleClick}
          >
            📝
          </button>

          <fetcher.Form method="post" action="/delete-log" className="ml-1">
            <input type="hidden" name="id" id="id" value={med.id} />
            <input type="hidden" name="log" id="log" value={med.log} />
            <button className="cursor-pointer transition-all hover:opacity-60">
              ❌
            </button>
          </fetcher.Form>
        </div>
      )}
    </>
  );
}
