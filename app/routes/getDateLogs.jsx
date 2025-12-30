import { redirect } from "react-router";
import { buildUrl } from "../../appconfig";
import { getLogsByDate } from "loaders.server";

export async function action() {
  throw redirect("/");
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const collection = url.searchParams.get("col");
  const date = url.searchParams.get("date");
  const timezoneOffset = url.searchParams.get("tz");
  const res = await fetch(buildUrl("api/auth/session"), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await res.json();
  if (!session?.user) throw redirect("/");

  const logs = await getLogsByDate(
    collection,
    session.user.email,
    date,
    "00:00",
    timezoneOffset,
  );
  console.log("LOGS:", logs);
  return { logs };
}
