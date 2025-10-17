import { redirect } from "react-router";
import { logNap } from "../../actions.server.js";

import { buildUrl } from "../../appconfig";

export async function action({ context, request }) {
  // if (!context?.session?.user) throw redirect("/");
  const resSession = await fetch(buildUrl(api/auth/session), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();
  const formData = await request.formData();
  const triggerNap = formData.get("triggerNap");
  const res = await logNap(session?.user.email, triggerNap);
}

export async function loader() {
  return redirect("/");
}
