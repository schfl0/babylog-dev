import { useFetcher } from "react-router";

export default function DateRadio({ todayView, logs }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="post"
      action="/set-todayview"
      className="flex gap-2 text-sm"
    >
      <input type="hidden" name="logs" value={logs} />
      <label className="flex items-center gap-1">
        <input
          className="h-4 w-4 border border-white/10 accent-pink-600"
          type="radio"
          name="setTodayView"
          value="today"
          defaultChecked={todayView[logs]}
          onChange={(e) => e.currentTarget.form.requestSubmit()}
        />
        Today
      </label>
      <label className="flex items-center gap-1">
        <input
          className="h-4 w-4 border border-white/10 accent-pink-600"
          type="radio"
          name="setTodayView"
          value="byDate"
          defaultChecked={!todayView[logs]}
          onChange={(e) => e.currentTarget.form.requestSubmit()}
        />
        By date
      </label>
    </fetcher.Form>
  );
}
