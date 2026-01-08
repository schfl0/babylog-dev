import { useSearchParams, useOutletContext } from "react-router";
import { useState, useEffect } from "react";
import { getAllLogs, getDateLogs } from "../../loaders.server";
import { buildUrl } from "appconfig";
import { getAllLogsDesc } from "../utils";

import OverviewBottleAllItem from "../components/OverviewBottleAllItem";
import OverviewFoodAllItem from "../components/OverviewFoodAllItem";
import OverviewNapAllItem from "../components/OverviewNapAllItem";
import OverviewPoopAllItem from "../components/OverviewPoopAllItem";
import OverviewTempAllItem from "../components/OverviewTempAllItem";
import OverviewMedAllItem from "../components/OverviewMedAllItem";

export async function loader({ request }) {
  const res = await fetch(buildUrl("api/auth/session"), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await res.json();
  if (!session?.user) throw redirect("/");
  const { email } = session.user;

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (date && date !== "") {
    const [bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs] =
      await Promise.all([
        getDateLogs("bottles", email, date, "Europe/Zurich"),
        getDateLogs("foods", email, date, "Europe/Zurich"),
        getDateLogs("naps", email, date, "Europe/Zurich"),
        getDateLogs("poops", email, date, "Europe/Zurich"),
        getDateLogs("temps", email, date, "Europe/Zurich"),
        getDateLogs("meds", email, date, "Europe/Zurich"),
      ]);
    return { bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs };
  } else {
    const [bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs] =
      await Promise.all([
        getAllLogs("bottles", email),
        getAllLogs("foods", email),
        getAllLogs("naps", email),
        getAllLogs("poops", email),
        getAllLogs("temps", email),
        getAllLogs("meds", email),
      ]);
    return {
      bottleLogs: bottleLogs.items,
      foodLogs: foodLogs.items,
      napLogs: napLogs.items,
      poopLogs: poopLogs.items,
      tempLogs: tempLogs.items,
      medLogs: medLogs.items,
    };
  }
}

export default function AllBottles({ loaderData }) {
  const { bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs } =
    loaderData;
  const [searchParams] = useSearchParams();
  const [allLogs, setAllLogs] = useState(
    getAllLogsDesc(bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs),
  );

  useEffect(() => {
    setAllLogs(
      getAllLogsDesc(
        bottleLogs,
        foodLogs,
        napLogs,
        poopLogs,
        tempLogs,
        medLogs,
      ),
    );
  }, [bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs]);

  const [isEdit, setIsEdit] = useState(null);
  const [isTodayEdit, setIsTodayEdit] = useOutletContext();

  const date = searchParams.get("date") ?? "";

  const overviewItems = {
    bottle: OverviewBottleAllItem,
    food: OverviewFoodAllItem,
    nap: OverviewNapAllItem,
    poop: OverviewPoopAllItem,
    temp: OverviewTempAllItem,
    med: OverviewMedAllItem,
  };

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="flex items-center">
        <h2 className="text-xs font-bold">🔭 Overview</h2>
        <form
          method="get"
          action="/logs/overview"
          className="flex flex-1 items-center justify-end gap-2"
        >
          <label htmlFor="date">
            By date:
            <input
              className="ml-2 rounded-sm border border-gray-400 bg-white px-1 py-0.5"
              type="date"
              id="date"
              name="date"
              defaultValue={date}
            />
          </label>
          <button
            type="submit"
            className="text-2xs cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-white transition-all hover:opacity-60"
          >
            🔎 Select
          </button>
        </form>
      </div>
      <div className="mt-4 flex flex-col justify-center">
        {allLogs.length > 0 ? (
          allLogs.map((log, index) => {
            const ItemComponent = overviewItems[log.log];
            if (!ItemComponent) return null;
            return (
              <ItemComponent
                log={log}
                key={index}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isTodayEdit={isTodayEdit}
                setIsTodayEdit={setIsTodayEdit}
              />
            );
          })
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
    </div>
  );
}
