import BottleLogger from "../components/BottleLogger";
import NapLogger from "../components/NapLogger";
import FoodLogger from "../components/FoodLogger";
import TempLogger from "../components/TempLogger";
import PoopLogger from "../components/PoopLogger";
import MedLogger from "../components/MedLogger";

export default function Loggers({ session, loggers, openNap }) {
  const loggerComponents = {
    bottles: BottleLogger,
    naps: NapLogger,
    foods: FoodLogger,
    poops: PoopLogger,
    temperature: TempLogger,
    medication: MedLogger,
  };

  return (
    <div className="flex flex-col gap-4">
      {loggers.map((logger) => {
        const LoggerComponent = loggerComponents[logger];
        return LoggerComponent ? (
          <LoggerComponent
            key={logger}
            session={session}
            logger={logger}
            openNap={openNap}
          />
        ) : null;
      })}
    </div>
  );
}
