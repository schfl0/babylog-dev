import OverviewToday from "../components/OverviewToday";
import TodayBottleLogs from "../components/TodayBottleLogs";
import TodayFoodLogs from "../components/TodayFoodLogs";
import TodayNapLogs from "../components/TodayNapLogs";
import TodayPoopLogs from "../components/TodayPoopLogs";
import TodayTempLogs from "../components/TodayTempLogs";
import TodayMedLogs from "../components/TodayMedLogs";

export default function TodayView({
  session,
  todayView,
  bottleLogs,
  foodLogs,
  napLogs,
  poopLogs,
  tempLogs,
  medLogs,
}) {
  const todayViewComponents = {
    overview: OverviewToday,
    bottles: TodayBottleLogs,
    foods: TodayFoodLogs,
    naps: TodayNapLogs,
    poops: TodayPoopLogs,
    temps: TodayTempLogs,
    meds: TodayMedLogs,
  };

  return (
    <div className="flex flex-col gap-4">
      {todayView === "overview" && (
        <OverviewToday
          bottleLogs={bottleLogs}
          foodLogs={foodLogs}
          napLogs={napLogs}
          poopLogs={poopLogs}
          tempLogs={tempLogs}
          medLogs={medLogs}
        />
      )}
      {todayView === "bottles" && <TodayBottleLogs bottleLogs={bottleLogs} />}
      {todayView === "foods" && <TodayFoodLogs foodLogs={foodLogs} />}
      {todayView === "naps" && <TodayNapLogs napLogs={napLogs} />}
      {todayView === "poops" && <TodayPoopLogs poopLogs={poopLogs} />}
      {todayView === "temps" && <TodayTempLogs tempLogs={tempLogs} />}
      {todayView === "meds" && <TodayMedLogs medLogs={medLogs} />}
    </div>
  );
}
