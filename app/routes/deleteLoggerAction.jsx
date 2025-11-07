import { redirect } from "react-router";
import { deleteLogger } from "../../actions.server.js";

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
  const logger = formData.get("deleteLogger");
  const res = await deleteLogger(session?.user.email, logger);
  return redirect("/");
}

export async function loader() {
  throw redirect("/");
}
