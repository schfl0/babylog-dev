import { redirect } from "react-router";
import { addTodayView } from "../../actions.server.js";

import { buildUrl } from "../../appconfig";

export async function action({ request }) {
  const resSession = await fetch(buildUrl(api/auth/session), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();
  const formData = await request.formData();
  const todayView = formData.get("addTodayView");
  const res = await addTodayView(session?.user.email, todayView.toLowerCase());
  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
