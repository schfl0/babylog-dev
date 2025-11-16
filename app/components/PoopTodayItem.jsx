import { useFetcher } from "react-router";
import { formatTime } from "../utils";
import PoopItemEdit from "../components/PoopItemEdit";

export default function PoopTodayItem({
  log: poop,
  isEdit,
  setIsEdit,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsTodayEdit(true);
    setIsEdit(poop.id);
    return;
  }

  return (
    <>
      {isEdit === poop.id && isTodayEdit ? (
        <PoopItemEdit poop={poop} setIsEdit={setIsEdit} />
      ) : (
        <div className="flex items-center justify-start hover:shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <p>Poop</p>
            </div>
            <p>{poop.poop.toUpperCase()}</p>
          </div>
          <div className="flex min-w-25 items-center justify-end">
            <p className="ml-12">{formatTime(poop.date)}</p>
          </div>
          <button
            className="ml-2 cursor-pointer hover:opacity-60"
            onClick={handleClick}
          >
            📝
          </button>
          <fetcher.Form method="post" action="/delete-log" className="ml-1">
            <input type="hidden" name="id" id="id" value={poop.id} />
            <input type="hidden" name="log" id="log" value={poop.log} />
            <button className="cursor-pointer transition-all hover:opacity-60">
              ❌
            </button>
          </fetcher.Form>
        </div>
      )}
    </>
  );
}
