import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getTodayLogs,
  getAllLogs,
  getDateLogs,
  getTodayVieww,
} from "../../loaders.server";
import FoodAllItem from "../components/FoodAllItem";
import FoodTodayItem from "../components/FoodTodayItem";
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

  const todayFoodLogs = await getTodayLogs("foods", email, timezone);
  const todayView = await getTodayVieww(email);

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (date && date !== "") {
    const foodLogs = await getDateLogs("foods", email, date, timezone);
    return { todayFoodLogs, todayView, foodLogs };
  } else {
    const foodLogs = await getAllLogs("foods", email);
    return { todayFoodLogs, todayView, foodLogs: foodLogs.items };
  }
}

export default function AllFoods({ loaderData }) {
  const { todayFoodLogs, todayView, foodLogs } = loaderData;
  const [isEdit, setIsEdit] = useState();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") ?? "";

  useEffect(() => {
    setIsEdit(null);
  }, [todayView]);

  return (
    <div className="rounded-lg border border-white/30 bg-white/30 px-2 py-4 shadow-md backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">🥦 Foods</h2>
        <DateRadio todayView={todayView} logs="foods" />
      </div>
      {!todayView.foods && (
        <>
          <DateSelector logs="foods" date={date} />
          <div className="mt-4 flex flex-col justify-center">
            {foodLogs.length > 0 ? (
              foodLogs.map((log, index) => {
                return (
                  <FoodAllItem
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
      {todayView.foods &&
        (todayFoodLogs.length > 0 ? (
          todayFoodLogs.map((log, index) => {
            return (
              <FoodTodayItem
                log={log}
                key={index}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            );
          })
        ) : (
          <p className="text-xs">No logs yet.</p>
        ))}
    </div>
  );
}
