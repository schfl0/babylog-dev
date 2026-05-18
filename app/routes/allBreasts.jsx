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
import BreastAllItem from "../components/BreastAllItem";
import BreastTodayItem from "../components/BreastTodayItem";
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

  const todayBreastLogs = await getTodayLogs("breasts", email, timezone);
  const todayView = await getTodayVieww(email);

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (date && date !== "") {
    const breastLogs = await getDateLogs("breasts", email, date, timezone);
    return { todayBreastLogs, todayView, breastLogs };
  } else {
    const breastLogs = await getAllLogs("breasts", email);
    return { todayBreastLogs, todayView, breastLogs: breastLogs.items };
  }
}

export default function BreastsNaps({ loaderData }) {
  const { todayBreastLogs, todayView, breastLogs } = loaderData;
  const [searchParams] = useSearchParams();
  const [isEdit, setIsEdit] = useState();
  const date = searchParams.get("date") ?? "";

  useEffect(() => {
    setIsEdit(null);
  }, [todayView]);

  return (
    <div className="rounded-md border border-gray-200 px-2 py-4 text-sm shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">🤱 Breastfeedings</h2>
        <DateRadio todayView={todayView} logs="breasts" />
      </div>
      {!todayView.breasts && (
        <>
          <DateSelector date={date} logs="breasts" />
          <div className="mt-4 flex flex-col justify-center">
            {breastLogs.length > 0 ? (
              breastLogs.map((log, index) => {
                return (
                  <BreastAllItem
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
      {todayView.breasts &&
        (todayBreastLogs.length > 0 ? (
          todayBreastLogs.map((log, index) => {
            return (
              <BreastTodayItem
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
