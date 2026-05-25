import { useFetcher } from "react-router";
import { formatTime, formatDate } from "../utils";
import MedItemEdit from "../components/MedItemEdit";

export default function MedAllItem({ log: med, isEdit, setIsEdit }) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsEdit(med.id);
  }

  return (
    <div
      className={`text-2xs hover:shadow-sm ${isEdit === med.id ? "my-1 rounded-md border border-gray-200 p-2" : ""}`}
    >
      <div className="flex items-center justify-start">
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
          <p className="ml-12">{formatTime(med.date)}</p>
        </div>
        <div className="ml-6 flex items-center justify-end">
          <p>{formatDate(med.date)}</p>
        </div>
        {isEdit !== med.id && (
          <>
            <button
              className="ml-2 cursor-pointer text-sm hover:opacity-60"
              onClick={handleClick}
            >
              📝
            </button>
            <fetcher.Form method="post" action="/delete-log" className="ml-1">
              <input type="hidden" name="id" id="id" value={med.id} />
              <input type="hidden" name="log" id="log" value={med.log} />
              <button className="cursor-pointer transition-all hover:opacity-60">
                🗑️
              </button>
            </fetcher.Form>
          </>
        )}
      </div>
      {isEdit === med.id && <MedItemEdit setIsEdit={setIsEdit} med={med} />}
    </div>
  );
}
