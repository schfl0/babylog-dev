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
  isTodayEdit,
  setIsTodayEdit,
  todayBottles,
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
          bottleLogs={bottleLogs}
          foodLogs={foodLogs}
          napLogs={napLogs}
          poopLogs={poopLogs}
          tempLogs={tempLogs}
          medLogs={medLogs}
        />
      )}
      {todayView === "bottles" && (
        <TodayBottleLogs
          // bottleLogs={bottleLogs}
          todayBottles={todayBottles}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
          today={today}
        />
      )}
      {todayView === "foods" && (
        <TodayFoodLogs
          foodLogs={foodLogs}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
      {todayView === "naps" && (
        <TodayNapLogs
          napLogs={napLogs}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
      {todayView === "poops" && (
        <TodayPoopLogs
          poopLogs={poopLogs}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
      {todayView === "temperature" && (
        <TodayTempLogs
          tempLogs={tempLogs}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
      {todayView === "medication" && (
        <TodayMedLogs
          medLogs={medLogs}
          isTodayEdit={isTodayEdit}
          setIsTodayEdit={setIsTodayEdit}
        />
      )}
    </div>
  );
}
