import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getTodayLogs,
  getTodayVieww,
  getAllLogs,
  getDateLogs,
} from "../../loaders.server";
import DateRadio from "../components/DateRadio";
import DateSelector from "../components/DateSelector.jsx";
import NapAllItem from "../components/NapAllItem";
import NapTodayItem from "../components/NapTodayItem";
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

  const todayNapLogs = await getTodayLogs("naps", email, timezone);
  const todayView = await getTodayVieww(email);

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (date && date !== "") {
    const napLogs = await getDateLogs("naps", email, date, timezone);
    return { todayNapLogs, todayView, napLogs };
  } else {
    const napLogs = await getAllLogs("naps", email);
    return { todayNapLogs, todayView, napLogs: napLogs.items };
  }
}

export default function AllNaps({ loaderData }) {
  const { todayNapLogs, todayView, napLogs } = loaderData;
  const [searchParams] = useSearchParams();
  const [isEdit, setIsEdit] = useState();
  const date = searchParams.get("date") ?? "";

  useEffect(() => {
    setIsEdit(null);
  }, [todayView]);

  return (
    <div className="rounded-md border border-gray-200 px-2 py-4 text-xs shadow-md md:text-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">💤 Naps</h2>
        <DateRadio todayView={todayView} logs="naps" />
      </div>
      {!todayView.naps && (
        <>
          <DateSelector date={date} logs="naps" />
          <div className="mt-4 flex flex-col justify-center">
            {napLogs.length > 0 ? (
              napLogs.map((log, index) => {
                return (
                  <NapAllItem
                    log={log}
                    key={index}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                  />
                );
              })
            ) : (
              <p className="text-xs">No logs yet.</p>
            )}
          </div>
        </>
      )}
      {todayView.naps &&
        (todayNapLogs.length > 0 ? (
          todayNapLogs.map((log, index) => {
            return (
              <NapTodayItem
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
