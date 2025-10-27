import { redirect } from "react-router";
import { selectAllView } from "../../actions.server.js";

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
  const allView = formData.get("selectAllView");
  const res = await selectAllView(session?.user.email, allView.toLowerCase());
  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
