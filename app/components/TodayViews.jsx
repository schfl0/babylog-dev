import BottlesTodayView from "../components/BottlesTodayView";
import FoodsTodayView from "../components/FoodsTodayView";
import NapsTodayView from "../components/NapsTodayView";
import TempsTodayView from "../components/TempsTodayView";
import MedsTodayView from "../components/MedsTodayView";

export default function TodayView({
  session,
  todayView,
  bottleLogs,
  foodLogs,
  napLogs,
  tempLogs,
  medLogs,
}) {
  const todayViewComponents = {
    bottles: BottlesTodayView,
    naps: NapsTodayView,
    foods: FoodsTodayView,
    temps: TempsTodayView,
    meds: MedsTodayView,
  };

  return (
    <div className="flex flex-col gap-4">
      {todayViews.map((todayView) => {
        const TodayViewComponent = todayViewComponents[todayView];
        return TodayViewComponent ? (
          <TodayViewComponent
            key={todayView}
            session={session}
            todayView={todayView}
            bottleLogs={bottleLogs}
            foodLogs={foodLogs}
            napLogs={napLogs}
            tempLogs={tempLogs}
            medLogs={medLogs}
          />
        ) : null;
      })}
    </div>
  );
}
