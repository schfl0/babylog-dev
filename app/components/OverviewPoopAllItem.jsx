import { useFetcher } from "react-router";
import { formatTime, formatDate } from "../utils";
import PoopItemEdit from "../components/PoopItemEdit";

export default function OverviewPoopAllItem({ log: poop, isEdit, setIsEdit }) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsEdit(poop.id);
  }

  return (
    <div
      className={`text-2xs hover:shadow-sm ${isEdit === poop.id ? "my-1 rounded-md border border-gray-200 p-2" : ""}`}
    >
      <div className="flex items-center justify-start">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <p>💩</p>
            <p>Poop</p>
          </div>
          <p>{poop.poop.toUpperCase()}</p>
        </div>
        <div className="flex min-w-25 items-center justify-end">
          <p className="ml-4">{formatTime(poop.date)}</p>
        </div>
        <div className="ml-6 flex items-center justify-end">
          <p>{formatDate(poop.date)}</p>
        </div>
        {isEdit !== poop.id && (
          <>
            <button
              className="ml-2 cursor-pointer text-sm hover:opacity-60"
              onClick={handleClick}
            >
              📝
            </button>
            <fetcher.Form method="post" action="/delete-log" className="ml-1">
              <input type="hidden" name="id" id="id" value={poop.id} />
              <input type="hidden" name="log" id="log" value={poop.log} />
              <button className="cursor-pointer transition-all hover:opacity-60">
                🗑️
              </button>
            </fetcher.Form>
          </>
        )}
      </div>
      {isEdit === poop.id && <PoopItemEdit setIsEdit={setIsEdit} poop={poop} />}
    </div>
  );
}
