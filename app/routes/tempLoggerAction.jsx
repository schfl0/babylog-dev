import { redirect } from "react-router";
import { logTemp } from "../../actions.server";

import { buildUrl } from "../appconfig";

export async function action({ request }) {
  // if (!context?.session?.user) throw redirect("/");
  const resSession = await fetch(buildUrl(http://localhost:3000/api/auth/session), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();
  const formData = await request.formData();
  const temp = formData.get("temp");

  const date = new Date();
  await logTemp(session?.user.email, temp, date);
}

export async function loader() {
  return redirect("/");
}
