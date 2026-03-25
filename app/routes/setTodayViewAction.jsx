import { redirect } from "react-router";
import { setTodayView } from "../../actions.server.js";

import { buildUrl } from "../../appconfig";

export async function action({ request }) {
  const resSession = await fetch(buildUrl("api/auth/session"), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();
  const formData = await request.formData();
  const logs = formData.get("logs");
  const todayView = formData.get("setTodayView");
  const isTodayView = todayView === "today";
  const res = await setTodayView(session?.user.email, logs, isTodayView);
  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
