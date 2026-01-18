import Login from "../components/Login";
import AddLogger from "../components/AddLogger";
import Loggers from "../components/Loggers";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { buildUrl } from "../../appconfig";

export function meta({}) {
  return [
    { title: "BabyLog" },
    { name: "BabyLog", content: "Welcome to BabyLog!" },
  ];
}

export async function loader({ request }) {
  const { getLoggers, getOpenNap, getOpenBreastLeft, getOpenBreastRight } =
    await import("loaders.server.js");
  const res = await fetch(buildUrl("api/auth/session"), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await res.json();

  const loggers = await getLoggers(session?.user.email);
  const openNap = await getOpenNap(session?.user.email);
  const openBreastLeft = await getOpenBreastLeft(session?.user.email);
  const openBreastRight = await getOpenBreastRight(session?.user.email);

  return { session, loggers, openNap, openBreastLeft, openBreastRight };
}

export default function Home({ loaderData }) {
  const { session, loggers, openNap, openBreastLeft, openBreastRight } =
    loaderData;

  const fetcher = useFetcher();

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    fetcher.submit(
      { timezone: tz },
      { method: "post", action: "/set-timezone" },
    );
  }, []);

  return (
    <div className="flex flex-col p-4 text-sm">
      {session?.user ? (
        <>
          <div className="mt-2">
            <AddLogger loggers={loggers} />
          </div>
          <div className="mt-6">
            <Loggers
              session={session}
              loggers={loggers}
              openNap={openNap}
              openBreastLeft={openBreastLeft}
              openBreastRight={openBreastRight}
            />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
