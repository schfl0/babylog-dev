import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getTodayLogs,
  getTodayVieww,
  getAllLogs,
  getDateLogs,
} from "../../loaders.server";
import MedAllItem from "../components/MedAllItem";
import MedTodayItem from "../components/MedTodayItem";
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

  const todayMedLogs = await getTodayLogs("meds", email, timezone);
  const todayView = await getTodayVieww(email);

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (date && date !== "") {
    const medLogs = await getDateLogs("meds", email, date, timezone);
    return { todayMedLogs, todayView, medLogs };
  } else {
    const medLogs = await getAllLogs("meds", email);
    return { todayMedLogs, todayView, medLogs: medLogs.items };
  }
}

export default function AllMeds({ loaderData }) {
  const { todayMedLogs, todayView, medLogs } = loaderData;
  const [isEdit, setIsEdit] = useState();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") ?? "";

  useEffect(() => {
    setIsEdit(null);
  }, [todayView]);

  return (
    <div className="rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">💊 Medication</h2>
        <DateRadio todayView={todayView} logs="meds" />
      </div>
      {!todayView.meds && (
        <>
          <DateSelector logs="medication" date={date} />
          <div className="mt-4 flex flex-col justify-center">
            {medLogs.length > 0 ? (
              medLogs.map((log, index) => {
                return (
                  <MedAllItem
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
      {todayView.meds &&
        (todayMedLogs.length > 0 ? (
          todayMedLogs.map((log, index) => {
            return (
              <MedTodayItem
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
