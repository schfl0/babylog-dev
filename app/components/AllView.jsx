import OverviewAll from "../components/OverviewAll";
import AllBottleLogs from "../components/AllBottleLogs";
import AllFoodLogs from "../components/AllFoodLogs";
import AllNapLogs from "../components/AllNapLogs";
import AllPoopLogs from "../components/AllPoopLogs";
import AllTempLogs from "../components/AllTempLogs";
import AllMedLogs from "../components/AllMedLogs";

export default function AllView({
  session,
  allView,
  bottleLogs,
  foodLogs,
  napLogs,
  poopLogs,
  tempLogs,
  medLogs,
}) {
  const allViewComponents = {
    overview: OverviewAll,
    bottles: AllBottleLogs,
    foods: AllFoodLogs,
    naps: AllNapLogs,
    poops: AllPoopLogs,
    temps: AllTempLogs,
    meds: AllMedLogs,
  };

  return (
    <div className="flex flex-col gap-4">
      {allView === "overview" && (
        <OverviewAll
          bottleLogs={bottleLogs}
          foodLogs={foodLogs}
          napLogs={napLogs}
          poopLogs={poopLogs}
          tempLogs={tempLogs}
          medLogs={medLogs}
        />
      )}
      {allView === "bottles" && <AllBottleLogs bottleLogs={bottleLogs} />}
      {allView === "foods" && <AllFoodLogs foodLogs={foodLogs} />}
      {allView === "naps" && <AllNapLogs napLogs={napLogs} />}
      {allView === "poops" && <AllPoopLogs poopLogs={poopLogs} />}
      {allView === "temps" && <AllTempLogs tempLogs={tempLogs} />}
      {allView === "meds" && <AllMedLogs medLogs={medLogs} />}
    </div>
  );
}
