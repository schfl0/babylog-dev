import { redirect } from "react-router";
import { logNap } from "../../actions.server.js";

export async function action({ context, request }) {
  // if (!context?.session?.user) throw redirect("/");
  const resSession = await fetch("http://localhost:3000/api/auth/session", {
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
