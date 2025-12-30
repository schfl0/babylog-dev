import OverviewToday from "../components/OverviewToday";
import TodayBottleLogs from "../components/TodayBottleLogs";
import TodayFoodLogs from "../components/TodayFoodLogs";
import TodayNapLogs from "../components/TodayNapLogs";
import TodayPoopLogs from "../components/TodayPoopLogs";
import TodayTempLogs from "../components/TodayTempLogs";
import TodayMedLogs from "../components/TodayMedLogs";

export default function TodayView({
  // session,
  todayView,
  isTodayEdit,
  setIsTodayEdit,
  todayBottles,
  todayFoods,
  todayNaps,
  todayPoops,
  todayTemps,
  todayMeds,
}) {
  const todayViewComponents = {
    overview: OverviewToday,
    bottles: TodayBottleLogs,
    foods: TodayFoodLogs,
    naps: TodayNapLogs,
    poops: TodayPoopLogs,
    temperature: TodayTempLogs,
    medication: TodayMedLogs,
  };

  const today = new Date();

  return (
    <div className="flex flex-col gap-4">
      {todayView === "overview" && (
        <OverviewToday
          todayBottles={todayBottles}
          todayFoods={todayFoods}
          todayNaps={todayNaps}
          todayPoops={todayPoops}
          todayTemps={todayTemps}
          todayMeds={todayMeds}
        />
      )}
      {todayView === "bottles" && (
        <TodayBottleLogs
          todayBottles={todayBottles}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
      {todayView === "foods" && (
        <TodayFoodLogs
          todayFoods={todayFoods}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
      {todayView === "naps" && (
        <TodayNapLogs
          todayNaps={todayNaps}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
      {todayView === "poops" && (
        <TodayPoopLogs
          todayPoops={todayPoops}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
      {todayView === "temperature" && (
        <TodayTempLogs
          todayTemps={todayTemps}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
      {todayView === "medication" && (
        <TodayMedLogs
          todayMeds={todayMeds}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
    </div>
  );
}
