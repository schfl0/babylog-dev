import { redirect } from "react-router";
import { useState } from "react";
import {
  getTodayView,
  getLogs,
  getNapLogs,
  getAllView,
} from "../../loaders.server";
import SelectTodayView from "../components/SelectTodayView";
import TodayView from "../components/TodayView";
import AllView from "../components/AllView";
import SelectAllView from "../components/SelectAllView";
import { buildUrl } from "../../appconfig";
import { getTodayLogsDesc } from "../utils";

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
  const todayView = await getTodayView(session?.user.email);
  const bottleLogs = await getLogs("bottles", session.user.email);
  const foodLogs = await getLogs("foods", session.user.email);
  const napLogs = await getNapLogs(session.user.email);
  const poopLogs = await getLogs("poops", session.user.email);
  const tempLogs = await getLogs("temps", session.user.email);
  const medLogs = await getLogs("meds", session.user.email);
  const allView = await getAllView(session?.user.email);
  return {
    session,
    todayView,
    bottleLogs,
    foodLogs,
    napLogs,
    poopLogs,
    tempLogs,
    medLogs,
    allView,
  };
}

export default function Logs({ loaderData }) {
  const {
    session,
    todayView,
    bottleLogs,
    foodLogs,
    napLogs,
    poopLogs,
    tempLogs,
    medLogs,
    allView,
  } = loaderData;

  const [view, setView] = useState();

  return (
    <div className="p-4 text-sm">
      <div className="mt-2">
        <h1 className="mb-2 text-base font-bold">Today</h1>
        <SelectTodayView todayView={todayView} />
      </div>
      <div className="mt-6">
        <TodayView
          todayView={todayView}
          bottleLogs={bottleLogs}
          foodLogs={foodLogs}
          napLogs={napLogs}
          poopLogs={poopLogs}
          tempLogs={tempLogs}
          medLogs={medLogs}
        />
      </div>
      <div className="mt-8">
        <h1 className="mb-2 text-base font-bold">All logs</h1>
        <SelectAllView />
      </div>
      <div className="mt-6">
        <AllView
          allView={allView}
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
