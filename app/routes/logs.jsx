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
    allView,
    todayView,
    todayBottles,
    todayFoods,
    todayNaps,
    todayPoops,
    todayTemps,
    todayMeds,
  } = loaderData;

  return (
    <div className="text">
      <div className="mt-6">
        <h1 className="mb-2 font-bold">Logs</h1>
        <SelectAllView allView={allView} />
      </div>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
