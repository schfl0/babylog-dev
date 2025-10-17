import { redirect } from "react-router";
import { logMed } from "../../actions.server.js";

import { buildUrl } from "../../appconfig";

export async function action({ request }) {
  // if (!context?.session?.user) throw redirect("/");
  const resSession = await fetch(buildUrl(api/auth/session), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();
  const formData = await request.formData();
  const med = formData.get("med");
  const g = formData.get("g");

  const date = new Date();
  await logMed(session?.user.email, med, g, date);
}

export async function loader() {
  return redirect("/");
}
