// import OverviewAll from "../components/OverviewAll";
// import AllBottleLogs from "../components/AllBottleLogs";
// import AllFoodLogs from "../components/AllFoodLogs";
// import AllNapLogs from "../components/AllNapLogs";
// import AllPoopLogs from "../components/AllPoopLogs";
// import AllTempLogs from "../components/AllTempLogs";
// import AllMedLogs from "../components/AllMedLogs";
// // import AllBreastLogs from "../components/AllBreastLogs";

// export default function AllView({
//   session,
//   allView,
//   bottleLogs,
//   foodLogs,
//   napLogs,
//   poopLogs,
//   tempLogs,
//   medLogs,
//   breastLogs,
//   isTodayEdit,
//   setIsTodayEdit,
// }) {
//   const allViewComponents = {
//     overview: OverviewAll,
//     bottles: AllBottleLogs,
//     foods: AllFoodLogs,
//     naps: AllNapLogs,
//     poops: AllPoopLogs,
//     temperature: AllTempLogs,
//     medication: AllMedLogs,
//     breastfeedings: AllBreastLogs,
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       {allView === "overview" && (
//         <OverviewAll
//           bottleLogs={bottleLogs}
//           foodLogs={foodLogs}
//           napLogs={napLogs}
//           poopLogs={poopLogs}
//           tempLogs={tempLogs}
//           medLogs={medLogs}
//           breastLogs={breasts}
//           isTodayEdit={isTodayEdit}
//           setIsTodayEdit={setIsTodayEdit}
//         />
//       )}
//       {allView === "bottles" && <AllBottleLogs bottleLogs={bottleLogs} />}
//       {allView === "foods" && <AllFoodLogs foodLogs={foodLogs} />}
//       {allView === "naps" && <AllNapLogs napLogs={napLogs} />}
//       {allView === "poops" && <AllPoopLogs poopLogs={poopLogs} />}
//       {allView === "temperature" && <AllTempLogs tempLogs={tempLogs} />}
//       {allView === "medication" && <AllMedLogs medLogs={medLogs} />}
//       {allView === "breastfeedings" && (
//         <AllBreastLogs breastLogs={breastLogs} />
//       )}
//     </div>
//   );
// }
