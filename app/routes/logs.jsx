import { redirect, Outlet } from "react-router";
import { useState } from "react";
import { getTodayView, getAllView, getTodayLogs } from "../../loaders.server";
import SelectTodayView from "../components/SelectTodayView";
import TodayView from "../components/TodayView";
import AllView from "../components/AllView";
import SelectAllView from "../components/SelectAllView";
import { buildUrl } from "../../appconfig";
import { getTodayLogsDesc, getDateLogsDesc } from "../utils";

export function meta({}) {
  return [{ title: "Logs" }, { name: "description", content: "Logs page" }];
}

export async function loader({ request }) {
  const res = await fetch(buildUrl("api/auth/session"), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await res.json();
  if (!session?.user) throw redirect("/");

  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, "");
  const allView = await getAllView(session?.user.email);

  if (pathname === "/logs") {
    throw redirect(`/logs/${allView}`);
  }
  const { email, timezone } = session?.user;
  const todayView = await getTodayView(session?.user.email);

  const [
    todayBottles,
    todayFoods,
    todayNaps,
    todayPoops,
    todayTemps,
    todayMeds,
  ] = await Promise.all([
    getTodayLogs("bottles", email, timezone),
    getTodayLogs("foods", email, timezone),
    getTodayLogs("naps", email, timezone),
    getTodayLogs("poops", email, timezone),
    getTodayLogs("temps", email, timezone),
    getTodayLogs("meds", email, timezone),
  ]);

  return {
    // session,
    allView,
    todayView,
    todayBottles,
    todayFoods,
    todayNaps,
    todayPoops,
    todayTemps,
    todayMeds,
  };
}

export default function Logs({ loaderData }) {
  const {
    // session,
    allView,
    todayView,
    todayBottles,
    todayFoods,
    todayNaps,
    todayPoops,
    todayTemps,
    todayMeds,
  } = loaderData;

  const [isTodayEdit, setIsTodayEdit] = useState(false);

  return (
    <div className="p-4 text-sm">
      <div className="mt-2">
        <h1 className="mb-2 text-sm font-bold">Today</h1>
        <SelectTodayView todayView={todayView} />
      </div>
      <div className="mt-6">
        <TodayView
          todayView={todayView}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
          todayBottles={todayBottles}
          todayFoods={todayFoods}
          todayNaps={todayNaps}
          todayPoops={todayPoops}
          todayTemps={todayTemps}
          todayMeds={todayMeds}
        />
      </div>
      <div className="mt-8">
        <h1 className="mb-2 text-sm font-bold">All logs</h1>
        <SelectAllView allView={allView} />
      </div>
      <div className="mt-4">
        {/* <AllView
          allView={allView}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
          bottleLogs={bottleLogs}
          foodLogs={foodLogs}
          napLogs={napLogs}
          poopLogs={poopLogs}
          tempLogs={tempLogs}
          medLogs={medLogs}
        /> */}
        <Outlet context={[isTodayEdit, setIsTodayEdit]} />
      </div>
    </div>
  );
}
