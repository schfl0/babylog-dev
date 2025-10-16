import { redirect } from "react-router";
import { getTodayViews, getLogs, getNapLogs } from "../../loaders.server";
import AddTodayView from "../components/AddTodayView";
import TodayViews from "../components/TodayViews";

export function meta({}) {
  return [{ title: "Logs" }, { name: "description", content: "Logs page" }];
}

export async function loader({ request }) {
  const res = await fetch("http://localhost:3000/api/auth/session", {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await res.json();

  if (!session?.user) throw redirect("/");
  const todayViews = await getTodayViews(session?.user.email);

  const bottleLogs = await getLogs("bottles", session.user.email);
  const foodLogs = await getLogs("foods", session.user.email);
  const napLogs = await getNapLogs(session.user.email);
  const tempLogs = await getLogs("temps", session.user.email);
  const medLogs = await getLogs("meds", session.user.email);
  return {
    session,
    todayViews,
    bottleLogs,
    foodLogs,
    napLogs,
    tempLogs,
    medLogs,
  };
}

export default function Logs({ loaderData }) {
  const {
    session,
    todayViews,
    bottleLogs,
    foodLogs,
    napLogs,
    tempLogs,
    medLogs,
  } = loaderData;
  return (
    <div className="p-4 text-sm">
      <div className="mt-2">
        <h1 className="mb-2 text-base font-bold">Today</h1>
        <AddTodayView bottleLogs={bottleLogs} foodLogs={foodLogs} />
      </div>
      <div className="mt-6">
        <TodayViews
          todayViews={todayViews}
          bottleLogs={bottleLogs}
          foodLogs={foodLogs}
          napLogs={napLogs}
          tempLogs={tempLogs}
          medLogs={medLogs}
        />
      </div>
    </div>
  );
}
