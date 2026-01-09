import { useSearchParams } from "react-router";
import { getAllLogs, getDateLogs } from "../../loaders.server";
import BottleAllItem from "../components/BottleAllItem";
import { buildUrl } from "appconfig";

export async function loader({ request }) {
  const res = await fetch(buildUrl("api/auth/session"), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await res.json();
  if (!session?.user) throw redirect("/");
  const { email, timezone } = session.user;

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (date && date !== "") {
    const bottleLogs = await getDateLogs("bottles", email, date, timezone);
    return { bottleLogs };
  } else {
    const bottleLogs = await getAllLogs("bottles", email);
    return { bottleLogs: bottleLogs.items };
  }
}

export default function AllBottles({ loaderData }) {
  const { bottleLogs } = loaderData;
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") ?? "";

  return (
    <div className="text-3xs rounded-md border border-gray-200 px-2 py-4 shadow-md">
      <div className="flex items-center">
        <h2 className="text-xs font-bold">🍼 Bottles</h2>
        <form
          method="get"
          action="/logs/bottles"
          className="flex flex-1 items-center justify-end gap-2"
        >
          <label htmlFor="date">
            By date:
            <input
              className="ml-2 rounded-sm border border-gray-400 bg-white px-1 py-0.5"
              type="date"
              id="date"
              name="date"
              defaultValue={date}
            />
          </label>
          <button
            type="submit"
            className="text-2xs cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-white transition-all hover:opacity-60"
          >
            🔎 Select
          </button>
        </form>
      </div>
      <div className="mt-4 flex flex-col justify-center">
        {bottleLogs.length > 0 ? (
          bottleLogs.map((log, index) => {
            return <BottleAllItem log={log} key={index} />;
          })
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
    </div>
  );
}
