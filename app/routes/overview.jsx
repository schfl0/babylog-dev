import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getTodayVieww,
  getTodayLogs,
  getAllLogs,
  getDateLogs,
} from "../../loaders.server";
import { buildUrl } from "appconfig";
import { getAllLogsDesc } from "../utils";
import DateRadio from "../components/DateRadio";
import DateSelector from "../components/DateSelector.jsx";
import OverviewBottleAllItem from "../components/OverviewBottleAllItem";
import OverviewFoodAllItem from "../components/OverviewFoodAllItem";
import OverviewNapAllItem from "../components/OverviewNapAllItem";
import OverviewPoopAllItem from "../components/OverviewPoopAllItem";
import OverviewTempAllItem from "../components/OverviewTempAllItem";
import OverviewMedAllItem from "../components/OverviewMedAllItem";
import OverviewBreastAllItem from "../components/OverviewBreastAllItem";
import OverviewBottleTodayItem from "../components/OverviewBottleTodayItem.jsx";
import OverviewFoodTodayItem from "../components/OverviewFoodTodayItem.jsx";
import OverviewNapTodayItem from "../components/OverviewNapTodayItem.jsx";
import OverviewPoopTodayItem from "../components/OverviewPoopTodayItem.jsx";
import OverviewTempTodayItem from "../components/OverviewTempTodayItem.jsx";
import OverviewMedTodayItem from "../components/OverviewMedTodayItem.jsx";
import OverviewBreastTodayItem from "../components/OverviewBreastTodayItem.jsx";

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

  const todayView = await getTodayVieww(email);
  const [
    todayBottleLogs,
    todayFoodLogs,
    todayNapLogs,
    todayPoopLogs,
    todayTempLogs,
    todayMedLogs,
    todayBreastLogs,
  ] = await Promise.all([
    getTodayLogs("bottles", email, timezone),
    getTodayLogs("foods", email, timezone),
    getTodayLogs("naps", email, timezone),
    getTodayLogs("poops", email, timezone),
    getTodayLogs("temps", email, timezone),
    getTodayLogs("meds", email, timezone),
    getTodayLogs("breasts", email, timezone),
  ]);

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (date && date !== "") {
    const [
      bottleLogs,
      foodLogs,
      napLogs,
      poopLogs,
      tempLogs,
      medLogs,
      breastLogs,
    ] = await Promise.all([
      getDateLogs("bottles", email, date, "Europe/Zurich"),
      getDateLogs("foods", email, date, "Europe/Zurich"),
      getDateLogs("naps", email, date, "Europe/Zurich"),
      getDateLogs("poops", email, date, "Europe/Zurich"),
      getDateLogs("temps", email, date, "Europe/Zurich"),
      getDateLogs("meds", email, date, "Europe/Zurich"),
      getDateLogs("breasts", email, date, "Europe/Zurich"),
    ]);
    return {
      todayBottleLogs,
      todayFoodLogs,
      todayNapLogs,
      todayPoopLogs,
      todayTempLogs,
      todayMedLogs,
      todayBreastLogs,
      todayView,
      bottleLogs,
      foodLogs,
      napLogs,
      poopLogs,
      tempLogs,
      medLogs,
      breastLogs,
    };
  } else {
    const [
      bottleLogs,
      foodLogs,
      napLogs,
      poopLogs,
      tempLogs,
      medLogs,
      breastLogs,
    ] = await Promise.all([
      getAllLogs("bottles", email),
      getAllLogs("foods", email),
      getAllLogs("naps", email),
      getAllLogs("poops", email),
      getAllLogs("temps", email),
      getAllLogs("meds", email),
      getAllLogs("breasts", email),
    ]);
    return {
      todayBottleLogs,
      todayFoodLogs,
      todayNapLogs,
      todayPoopLogs,
      todayTempLogs,
      todayMedLogs,
      todayBreastLogs,
      todayView,
      bottleLogs: bottleLogs.items,
      foodLogs: foodLogs.items,
      napLogs: napLogs.items,
      poopLogs: poopLogs.items,
      tempLogs: tempLogs.items,
      medLogs: medLogs.items,
      breastLogs: breastLogs.items,
    };
  }
}

export default function AllOverview({ loaderData }) {
  const {
    todayBottleLogs,
    todayFoodLogs,
    todayNapLogs,
    todayPoopLogs,
    todayTempLogs,
    todayMedLogs,
    todayBreastLogs,
    todayView,
    bottleLogs,
    foodLogs,
    napLogs,
    poopLogs,
    tempLogs,
    medLogs,
    breastLogs,
  } = loaderData;
  const [searchParams] = useSearchParams();
  const [allLogs, setAllLogs] = useState(
    getAllLogsDesc(
      bottleLogs,
      foodLogs,
      napLogs,
      poopLogs,
      tempLogs,
      medLogs,
      breastLogs,
    ),
  );
  const [allTodayLogs, setAllTodayLogs] = useState(
    getAllLogsDesc(
      todayBottleLogs,
      todayFoodLogs,
      todayNapLogs,
      todayPoopLogs,
      todayTempLogs,
      todayMedLogs,
      todayBreastLogs,
    ),
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
        breastLogs,
      ),
    );
  }, [bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs, breastLogs]);

  useEffect(() => {
    setAllTodayLogs(
      getAllLogsDesc(
        todayBottleLogs,
        todayFoodLogs,
        todayNapLogs,
        todayPoopLogs,
        todayTempLogs,
        todayMedLogs,
        todayBreastLogs,
      ),
    );
  }, [
    todayBottleLogs,
    todayFoodLogs,
    todayNapLogs,
    todayPoopLogs,
    todayTempLogs,
    todayMedLogs,
    todayBreastLogs,
  ]);

  const [isEdit, setIsEdit] = useState(null);
  const date = searchParams.get("date") ?? "";

  useEffect(() => {
    setIsEdit(null);
  }, [todayView]);

  const overviewAllItems = {
    bottle: OverviewBottleAllItem,
    food: OverviewFoodAllItem,
    nap: OverviewNapAllItem,
    poop: OverviewPoopAllItem,
    temp: OverviewTempAllItem,
    med: OverviewMedAllItem,
    breast: OverviewBreastAllItem,
  };
  const overviewTodayItems = {
    bottle: OverviewBottleTodayItem,
    food: OverviewFoodTodayItem,
    nap: OverviewNapTodayItem,
    poop: OverviewPoopTodayItem,
    temp: OverviewTempTodayItem,
    med: OverviewMedTodayItem,
    breast: OverviewBreastTodayItem,
  };

  return (
    <div className="rounded-md border border-gray-200 px-2 py-4 text-xs shadow-md md:text-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">📊 Overview</h2>
        <DateRadio todayView={todayView} logs="overview" />
      </div>
      {!todayView.overview && (
        <>
          <DateSelector logs="overview" date={date} />
          <div className="mt-4 flex flex-col justify-center">
            {allLogs.length > 0 ? (
              allLogs.map((log, index) => {
                const ItemComponent = overviewAllItems[log.log];
                if (!ItemComponent) return null;
                return (
                  <ItemComponent
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
      {todayView.overview &&
        (allTodayLogs.length > 0 ? (
          allTodayLogs.map((log, index) => {
            const ItemComponent = overviewTodayItems[log.log];
            return (
              <ItemComponent
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
