import { redirect } from "react-router";
import { logBreastRight } from "../../actions.server.js";

import { buildUrl } from "../../appconfig";

export async function action({ context, request }) {
  // if (!context?.session?.user) throw redirect("/");
  const resSession = await fetch(buildUrl("api/auth/session"), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();
  const formData = await request.formData();
  const triggerBreastRight = formData.get("triggerBreastRight");
  const res = await logBreastRight(session?.user.email, triggerBreastRight);
}

export async function loader() {
  return redirect("/");
}
