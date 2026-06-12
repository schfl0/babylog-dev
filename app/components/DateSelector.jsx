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
        className="rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-sm"
        type="date"
        id="date"
        name="date"
        defaultValue={date}
      />
      <button
        type="submit"
        className="cursor-pointer rounded-full bg-pink-600 px-3 py-1 text-white transition-all hover:opacity-60"
      >
        🔎
      </button>
      <button
        type="button"
        onClick={() => submit(null, { method: "get", action: `/logs/${logs}` })}
        className="cursor-pointer rounded-full bg-pink-600 px-3 py-1 text-white transition-all hover:opacity-60"
      >
        🗓️
      </button>
    </form>
  );
}
