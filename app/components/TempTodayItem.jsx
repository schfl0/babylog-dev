import { useFetcher } from "react-router";
import { formatTime } from "../utils";
import TempItemEdit from "../components/TempItemEdit";

export default function TempTodayItem({ log: temp, isEdit, setIsEdit }) {
  const fetcher = useFetcher();

  function handleClick() {
    setIsEdit(temp.id);
  }

  return (
    <div
      className={`text-xs hover:shadow-sm ${isEdit === temp.id ? "my-1 rounded-md border border-gray-200 p-2" : ""}`}
    >
      <div className="flex items-center justify-start">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <p>Temp</p>
          </div>
          <p>{temp.temp} °C</p>
        </div>
        <div className="flex min-w-25 items-center justify-end">
          <p className="ml-12">{formatTime(temp.date)}</p>
        </div>
        {isEdit !== temp.id && (
          <>
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
                🗑️
              </button>
            </fetcher.Form>
          </>
        )}
      </div>
      {isEdit === temp.id && <TempItemEdit setIsEdit={setIsEdit} temp={temp} />}
    </div>
  );
}
