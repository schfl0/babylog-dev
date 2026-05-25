import { useSubmit } from "react-router";
export default function DateSelector({ logs, date }) {
  const submit = useSubmit();

  return (
    <form
      method="get"
      action={`/logs/${logs}`}
      className="flex flex-1 items-center justify-end gap-2 text-sm"
    >
      <input
        className="ml-2 rounded-sm border border-gray-400 bg-white px-1 py-0.5"
        type="date"
        id="date"
        name="date"
        defaultValue={date}
      />
      <button
        type="submit"
        className="cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-white transition-all hover:opacity-60"
      >
        🔎
      </button>
      <button
        type="button"
        onClick={() => submit(null, { method: "get", action: `/logs/${logs}` })}
        className="cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-white transition-all hover:opacity-60"
      >
        🗓️
      </button>
    </form>
  );
}
