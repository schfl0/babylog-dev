import { redirect } from "react-router";
import { deleteLog } from "../../actions.server";
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
  const id = formData.get("id");
  const log = formData.get("log");

  await deleteLog(id, log);
  redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}