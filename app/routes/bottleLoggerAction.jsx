import { redirect } from "react-router";
import { logBottle } from "../../actions.server.js";

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
  const ml = formData.get("ml");
  const date = new Date();
  await logBottle(session?.user.email, ml, date);
}

export async function loader() {
  return redirect("/");
}
