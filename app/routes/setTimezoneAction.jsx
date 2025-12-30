import { redirect } from "react-router";
import { setTimezone } from "../../actions.server";
import { buildUrl } from "../../appconfig";

export async function action({ request }) {
  const resSession = await fetch(buildUrl("api/auth/session"), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();

  if (!session?.user?.email) throw redirect("/");

  const formData = await request.formData();
  const tz = formData.get("timezone");
  await setTimezone(session.user.email, tz);
}

export async function loader() {
  return redirect("/");
}
