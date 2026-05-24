import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getTodayLogs,
  getAllLogs,
  getDateLogs,
  getTodayVieww,
} from "../../loaders.server";
import BottleAllItem from "../components/BottleAllItem";
import BottleTodayItem from "../components/BottleTodayItem";
import DateRadio from "../components/DateRadio";
import DateSelector from "../components/DateSelector.jsx";
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
  const [isEdit, setIsEdit] = useState(null);
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") ?? "";

  useEffect(() => {
    setIsEdit(null);
  }, [todayView]);

  return (
    <div className="rounded-md border border-gray-200 px-2 py-4 text-xs shadow-md md:text-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">🍼 Bottles</h2>
        <DateRadio todayView={todayView} logs="bottles" setIsEdit={setIsEdit} />
      </div>
      {!todayView.bottles && (
        <>
          <DateSelector logs="bottles" date={date} />
          <div className="mt-4 flex flex-col justify-center">
            {bottleLogs.length > 0 ? (
              bottleLogs.map((log, index) => {
                return (
                  <BottleAllItem
                    log={log}
                    key={index}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                  />
                );
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
          <p className="text-xs">No logs yet.</p>
        ))}
    </div>
  );
}
