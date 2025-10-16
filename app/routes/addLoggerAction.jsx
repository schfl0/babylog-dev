import { redirect } from "react-router";
import { addLogger } from "../../actions.server.js";
export async function action({ request }) {
   const resSession = await fetch("http://localhost:3000/api/auth/session", {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();
  const formData = await request.formData();
  const logger = formData.get("addLogger");
  const res = await addLogger(
    session?.user.email,
    logger.toLowerCase(),
  );
  return redirect("/");
}

export async function loader() {
  throw redirect("/");
}
