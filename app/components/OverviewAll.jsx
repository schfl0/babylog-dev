import { useState, useEffect } from "react";
import { getAllLogsDesc, getDateLogsDesc } from "../utils";

import OverviewBottleAllItem from "./OverviewBottleAllItem";
import OverviewFoodAllItem from "./OverviewFoodAllItem";
import OverviewNapAllItem from "./OverviewNapAllItem";
import OverviewPoopAllItem from "./OverviewPoopAllItem";
import OverviewTempAllItem from "./OverviewTempAllItem";
import OverviewMedAllItem from "./OverviewMedAllItem";
import DateFilter from "./DateFilter";

export default function OverviewAll({
  bottleLogs,
  foodLogs,
  napLogs,
  poopLogs,
  tempLogs,
  medLogs,
  isTodayEdit,
  setIsTodayEdit,
}) {
  const [filteredOverview, setFilteredOverview] = useState(
    getAllLogsDesc(bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs),
  );

  const [dateFilter, setDateFilter] = useState("");

  const [isEdit, setIsEdit] = useState(null);

  const overviewItems = {
    bottle: OverviewBottleAllItem,
    food: OverviewFoodAllItem,
    nap: OverviewNapAllItem,
    poop: OverviewPoopAllItem,
    temp: OverviewTempAllItem,
    med: OverviewMedAllItem,
  };

  useEffect(() => {
    if (!dateFilter) {
      setFilteredOverview(
        getAllLogsDesc(
          bottleLogs,
          foodLogs,
          napLogs,
          poopLogs,
          tempLogs,
          medLogs,
        ),
      );
    } else {
      setFilteredOverview(
        getDateLogsDesc(
          dateFilter,
          bottleLogs,
          foodLogs,
          napLogs,
          poopLogs,
          tempLogs,
          medLogs,
        ),
      );
    }
  }, [dateFilter, bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs]);

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="flex items-center">
        <h2 className="text-xs font-bold">🔭 Overview</h2>
        <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>
      <div className="mt-4 flex flex-col justify-center">
        {filteredOverview.length > 0 ? (
          filteredOverview.map((log, index) => {
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
