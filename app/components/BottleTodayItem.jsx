import { formatTime } from "../utils";
import BottleItemEdit from "../components/BottleItemEdit";

export default function BottleTodayItem({ log: bottle, isEdit, setIsEdit }) {
  function handleClick() {
    console.log(bottle.id);
    setIsEdit(bottle.id);
  }

  return (
    <>
      {isEdit === bottle.id ? (
        <BottleItemEdit bottle={bottle} />
      ) : (
        <div className="flex items-center justify-start">
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
        </div>
      )}
    </>
  );
}
