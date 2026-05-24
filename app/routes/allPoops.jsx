import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getTodayLogs,
  getTodayVieww,
  getAllLogs,
  getDateLogs,
} from "../../loaders.server";
import PoopAllItem from "../components/PoopAllItem";
import PoopTodayItem from "../components/PoopTodayItem";
import { buildUrl } from "appconfig";
import DateRadio from "../components/DateRadio";
import DateSelector from "../components/DateSelector";

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

  const todayPoopLogs = await getTodayLogs("poops", email, timezone);
  const todayView = await getTodayVieww(email);

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (date && date !== "") {
    const poopLogs = await getDateLogs("poops", email, date, timezone);
    return { todayPoopLogs, todayView, poopLogs };
  } else {
    const poopLogs = await getAllLogs("poops", email);
    return { todayPoopLogs, todayView, poopLogs: poopLogs.items };
  }
}

export default function AllPoops({ loaderData }) {
  const { todayPoopLogs, todayView, poopLogs } = loaderData;
  const [isEdit, setIsEdit] = useState();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") ?? "";

  useEffect(() => {
    setIsEdit(null);
  }, [todayView]);

  return (
    <div className="rounded-md border border-gray-200 px-2 py-4 text-xs shadow-md md:text-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">💩 Poops</h2>
        <DateRadio todayView={todayView} logs="poops" />
      </div>
      {!todayView.poops && (
        <>
          <DateSelector logs="poops" date={date} />
          <div className="mt-4 flex flex-col justify-center">
            {poopLogs.length > 0 ? (
              poopLogs.map((log, index) => {
                return (
                  <PoopAllItem
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
      {todayView.poops &&
        (todayPoopLogs.length > 0 ? (
          todayPoopLogs.map((log, index) => {
            return (
              <PoopTodayItem
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
