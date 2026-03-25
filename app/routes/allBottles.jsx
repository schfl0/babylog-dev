import {
  useSearchParams,
  useSubmit,
  useOutletContext,
  useFetcher,
} from "react-router";
import { useState } from "react";
import {
  getTodayLogs,
  getAllLogs,
  getDateLogs,
  getTodayVieww,
} from "../../loaders.server";
import BottleAllItem from "../components/BottleAllItem";
import BottleTodayItem from "../components/BottleTodayItem";
import { buildUrl } from "appconfig";

export async function loader({ request }) {
  const res = await fetch(buildUrl("api/auth/session"), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await res.json();
  if (!session?.user) throw redirect("/");
  const { email, timezone } = session.user;

  const todayBottleLogs = await getTodayLogs("bottles", email, timezone);
  const todayView = await getTodayVieww(email);

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (date && date !== "") {
    const bottleLogs = await getDateLogs("bottles", email, date, timezone);
    return { todayBottleLogs, todayView, bottleLogs };
  } else {
    const bottleLogs = await getAllLogs("bottles", email);
    return { todayBottleLogs, todayView, bottleLogs: bottleLogs.items };
  }
}

export default function AllBottles({ loaderData }) {
  const { todayBottleLogs, todayView, bottleLogs } = loaderData;
  const [isEdit, setIsEdit] = useOutletContext();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const date = searchParams.get("date") ?? "";

  const fetcher = useFetcher();

  const [isToday, setIsToday] = useState(true);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-bold">🍼 Bottles</h2>
        <fetcher.Form
          method="post"
          action="/set-todayview"
          className="flex gap-2"
        >
          <input type="hidden" name="logs" value="bottles" />
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="setTodayView"
              value="today"
              defaultChecked={todayView.bottles}
              onChange={(e) => e.currentTarget.form.requestSubmit()}
            />
            Today
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="setTodayView"
              value="byDate"
              defaultChecked={!todayView.bottles}
              onChange={(e) => e.currentTarget.form.requestSubmit()}
            />
            By date
          </label>
        </fetcher.Form>
      </div>
      {!todayView.bottles && (
        <>
          <form
            method="get"
            action="/logs/bottles"
            className="flex flex-1 items-center justify-end gap-2"
          >
            <label htmlFor="date">
              By date:
              <input
                className="ml-2 rounded-sm border border-gray-400 bg-white px-1 py-0.5"
                type="date"
                id="date"
                name="date"
                defaultValue={date}
              />
            </label>
            <button
              type="submit"
              className="text-2xs cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-white transition-all hover:opacity-60"
            >
              🔎 Select
            </button>
            <button
              type="button"
              onClick={() =>
                submit(null, { method: "get", action: "/logs/bottles" })
              }
              className="text-2xs cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-white transition-all hover:opacity-60"
            >
              🗓️ All
            </button>
          </form>
          <div className="mt-4 flex flex-col justify-center">
            {bottleLogs.length > 0 ? (
              bottleLogs.map((log, index) => {
                return <BottleAllItem log={log} key={index} />;
              })
            ) : (
              <p>No logs yet.</p>
            )}
          </div>
        </>
      )}
      {todayView.bottles &&
        (todayBottleLogs.length > 0 ? (
          todayBottleLogs.map((log, index) => {
            return (
              <BottleTodayItem
                log={log}
                key={index}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            );
          })
        ) : (
          <p>No logs yet.</p>
        ))}
    </div>
  );
}
