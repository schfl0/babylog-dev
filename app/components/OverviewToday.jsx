import { getTodayLogsDesc } from "../utils";
import { useState } from "react";

import OverviewBottleTodayItem from "./OverviewBottleTodayItem";
import OverviewFoodTodayItem from "./OverviewFoodTodayItem";
import OverviewNapTodayItem from "./OverviewNapTodayItem";
import OverviewPoopTodayItem from "./OverviewPoopTodayItem";
import OverviewTempTodayItem from "./OverviewTempTodayItem";
import OverviewMedTodayItem from "./OverviewMedTodayItem";

export default function OverviewToday({
  bottleLogs,
  foodLogs,
  napLogs,
  poopLogs,
  tempLogs,
  medLogs,
}) {
  const [filteredOverview, setFilteredOverview] = useState(
    getTodayLogsDesc(
      bottleLogs,
      foodLogs,
      napLogs,
      poopLogs,
      tempLogs,
      medLogs,
    ),
  );

  const overviewItems = {
    bottle: OverviewBottleTodayItem,
    food: OverviewFoodTodayItem,
    nap: OverviewNapTodayItem,
    poop: OverviewPoopTodayItem,
    temp: OverviewTempTodayItem,
    med: OverviewMedTodayItem,
  };

  return (
    <div className="rounded-md px-2 py-4 text-sm shadow-md">
      <h2 className="font-bold">🔭 Overview</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredOverview.map((log, index) => {
          const ItemComponent = overviewItems[log.log];
          if (!ItemComponent) return null;
          return <ItemComponent log={log} key={index} />;
        })}
      </div>
    </div>
  );
}
