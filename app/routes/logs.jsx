import { redirect } from "react-router";
import { useState } from "react";
import {
  getTodayView,
  getLogs,
  getNapLogs,
  getAllView,
  getTodayLogs,
} from "../../loaders.server";
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

  const { email, timezone } = session?.user;

  const todayView = await getTodayView(session?.user.email);
  const todayBottles = await getTodayLogs("bottles", email, timezone);
  const todayFoods = await getTodayLogs("foods", email, timezone);
  const todayNaps = await getTodayLogs("naps", email, timezone);
  const todayPoops = await getTodayLogs("poops", email, timezone);
  const todayTemps = await getTodayLogs("temps", email, timezone);
  const todayMeds = await getTodayLogs("meds", email, timezone);

  const allView = await getAllView(session?.user.email);
  const bottleLogs = await getLogs("bottles", session.user.email);
  const foodLogs = await getLogs("foods", session.user.email);
  const napLogs = await getNapLogs(session.user.email);
  const poopLogs = await getLogs("poops", session.user.email);
  const tempLogs = await getLogs("temps", session.user.email);
  const medLogs = await getLogs("meds", session.user.email);
  return {
    // session,
    todayView,
    todayBottles,
    todayFoods,
    todayNaps,
    todayPoops,
    todayTemps,
    todayMeds,

    allView,
    bottleLogs,
    foodLogs,
    napLogs,
    poopLogs,
    tempLogs,
    medLogs,
  };
}

export default function Logs({ loaderData }) {
  const {
    // session,
    todayView,
    todayBottles,
    todayFoods,
    todayNaps,
    todayPoops,
    todayTemps,
    todayMeds,

    allView,
    bottleLogs,
    foodLogs,
    napLogs,
    poopLogs,
    tempLogs,
    medLogs,
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
        <AllView
          allView={allView}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
          bottleLogs={bottleLogs}
          foodLogs={foodLogs}
          napLogs={napLogs}
          poopLogs={poopLogs}
          tempLogs={tempLogs}
          medLogs={medLogs}
        />
      </div>
    </div>
  );
}
