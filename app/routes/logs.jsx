import { redirect, Outlet } from "react-router";
import { useState } from "react";
import { getAllView } from "../../loaders.server";
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

  return {
    allView,
  };
}

export default function Logs({ loaderData }) {
  const { allView } = loaderData;

  return (
    <>
      <div className="mt-6">
        <h1 className="mb-2 font-bold">Logs</h1>
        <SelectAllView allView={allView} />
      </div>
      <div className="mt-4">
        <Outlet />
      </div>
    </>
  );
}
