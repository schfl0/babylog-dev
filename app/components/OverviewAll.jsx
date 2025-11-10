import { useState, useEffect } from "react";
import { getAllLogsDesc } from "../utils";

import OverviewBottleAllItem from "./OverviewBottleAllItem";
import OverviewFoodAllItem from "./OverviewFoodAllItem";
import OverviewNapAllItem from "./OverviewNapAllItem";
import OverviewPoopAllItem from "./OverviewPoopAllItem";
import OverviewTempAllItem from "./OverviewTempAllItem";
import OverviewMedAllItem from "./OverviewMedAllItem";

export default function OverviewAll({
  bottleLogs,
  foodLogs,
  napLogs,
  poopLogs,
  tempLogs,
  medLogs,
}) {
  const [filteredOverview, setFilteredOverview] = useState(
    getAllLogsDesc(bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs),
  );

  const overviewItems = {
    bottle: OverviewBottleAllItem,
    food: OverviewFoodAllItem,
    nap: OverviewNapAllItem,
    poop: OverviewPoopAllItem,
    temp: OverviewTempAllItem,
    med: OverviewMedAllItem,
  };

  useEffect(() => {
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
  }, [bottleLogs, foodLogs, napLogs, poopLogs, tempLogs, medLogs]);

  const [isEdit, setIsEdit] = useState(null);

  return (
    <div className="rounded-md px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">🔭 Overview</h2>
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
