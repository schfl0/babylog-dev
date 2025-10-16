import BottlesTodayView from "../components/BottlesTodayView";
import FoodsTodayView from "../components/FoodsTodayView";

export default function TodayViews({ session, todayViews }) {
  const todayViewComponents = {
    bottles: BottlesTodayView,
    food: FoodsTodayView,
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
          />
        ) : null;
      })}
    </div>
  );
}
