import { getAllLogsDesc } from "../utils";
import { useState } from "react";

import FoodAllItem from "./FoodAllItem";

export default function AllFoodLogs({ foodLogs }) {
  const [filteredFoods, setFilteredFoods] = useState(getAllLogsDesc(foodLogs));

  return (
    <div className="rounded-md border border-gray-200 bg-orange-50 px-2 py-4 text-xs shadow-md">
      <h2 className="text-sm font-bold">🥕 Foods</h2>
      <div className="mt-4 flex flex-col justify-center">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((log, index) => {
            return <FoodAllItem log={log} key={index} />;
          })
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
    </div>
  );
}
