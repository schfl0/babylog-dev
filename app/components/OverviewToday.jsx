import { getTodayLogsDesc } from "../utils";
import { useState, useEffect } from "react";
import OverviewBottleTodayItem from "./OverviewBottleTodayItem";
import OverviewFoodTodayItem from "./OverviewFoodTodayItem";
import OverviewNapTodayItem from "./OverviewNapTodayItem";
import OverviewPoopTodayItem from "./OverviewPoopTodayItem";
import OverviewTempTodayItem from "./OverviewTempTodayItem";
import OverviewMedTodayItem from "./OverviewMedTodayItem";

export default function OverviewToday({
  todayBottles,
  todayFoods,
  todayNaps,
  todayPoops,
  todayTemps,
  todayMeds,
}) {
  const [filteredOverview, setFilteredOverview] = useState(
    getTodayLogsDesc(
      todayBottles,
      todayFoods,
      todayNaps,
      todayPoops,
      todayTemps,
      todayMeds,
    ),
  );

  useEffect(() => {
    getTodayLogsDesc(
      todayBottles,
      todayFoods,
      todayNaps,
      todayPoops,
      todayTemps,
      todayMeds,
    );
  }, [todayBottles, todayFoods, todayNaps, todayPoops, todayTemps, todayMeds]);

  const overviewItems = {
    bottle: OverviewBottleTodayItem,
    food: OverviewFoodTodayItem,
    nap: OverviewNapTodayItem,
    poop: OverviewPoopTodayItem,
    temp: OverviewTempTodayItem,
    med: OverviewMedTodayItem,
  };

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <h2 className="text-xs font-bold">🔭 Overview</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredOverview.length > 0 ? (
          filteredOverview.map((log, index) => {
            const ItemComponent = overviewItems[log.log];
            if (!ItemComponent) return null;
            return <ItemComponent log={log} key={index} />;
          })
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
    </div>
  );
}
