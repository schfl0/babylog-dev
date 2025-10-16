import { redirect } from "react-router";
import { deleteTodayView } from "../../actions.server.js";
export async function action({ request }) {
  const resSession = await fetch("http://localhost:3000/api/auth/session", {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();
  const formData = await request.formData();
  const todayView = formData.get("deleteTodayView");
  const res = await deleteTodayView(
    session?.user.email,
    todayView.toLowerCase(),
  );
  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
