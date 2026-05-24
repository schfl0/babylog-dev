import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getTodayLogs,
  getTodayVieww,
  getAllLogs,
  getDateLogs,
} from "../../loaders.server";
import TempAllItem from "../components/TempAllItem";
import TempTodayItem from "../components/TempTodayItem";
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

  const todayTempLogs = await getTodayLogs("temps", email, timezone);
  const todayView = await getTodayVieww(email);

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (date && date !== "") {
    const tempLogs = await getDateLogs("temps", email, date, timezone);
    return { todayTempLogs, todayView, tempLogs };
  } else {
    const tempLogs = await getAllLogs("temps", email);
    return { todayTempLogs, todayView, tempLogs: tempLogs.items };
  }
}

export default function AllBottles({ loaderData }) {
  const { todayTempLogs, todayView, tempLogs } = loaderData;
  const [isEdit, setIsEdit] = useState();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") ?? "";

  useEffect(() => {
    setIsEdit(null);
  }, [todayView]);

  return (
    <div className="rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">🌡️ Temperature</h2>
        <DateRadio todayView={todayView} logs="temps" />
      </div>
      {!todayView.temps && (
        <>
          <DateSelector logs="temperature" date={date} />

          <div className="mt-4 flex flex-col justify-center">
            {tempLogs.length > 0 ? (
              tempLogs.map((log, index) => {
                return (
                  <TempAllItem
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
      {todayView.temps &&
        (todayTempLogs.length > 0 ? (
          todayTempLogs.map((log, index) => {
            return (
              <TempTodayItem
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
