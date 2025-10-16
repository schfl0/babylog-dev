import { useState, useEffect } from "react";
import { filterToday } from "../utils";

export default function TodayBottleLogs({ bottleLogs }) {
  const [todayBottles, setTodayBottles] = useState(filterToday(bottleLogs));

  useEffect(() => {
    setTodayBottles(filterToday(bottleLogs));
  }, [bottleLogs]);

  return (
    <div>
      <p>Today Bottles</p>
      {todayBottles.length > 0 &&
        todayBottles.map((bottle) => <p>{bottle.ml}</p>)}
    </div>
  );
}
