import BottleLogger from "../components/BottleLogger";
import NapLogger from "../components/NapLogger";
import FoodLogger from "../components/FoodLogger";
import TempLogger from "../components/TempLogger";
import MedLogger from "../components/MedLogger";

export default function Loggers({ session, loggers, openNap }) {
  const loggerComponents = {
    bottle: BottleLogger,
    nap: NapLogger,
    food: FoodLogger,
    temp: TempLogger,
    med: MedLogger,
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
