import { redirect } from "react-router";
import { logPoop } from "../../actions.server.js";
import { z } from "zod";
import { buildUrl } from "../../appconfig";

const PoopSchema = z.object({
  poop: z.enum(["sm", "md", "lg", "xl"]),
});

export async function action({ request }) {
  // if (!context?.session?.user) throw redirect("/");
  const resSession = await fetch(buildUrl("api/auth/session"), {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();

  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  const data = PoopSchema.safeParse(rawData);

  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const { poop } = data.data;
  const date = new Date();
  await logPoop(session?.user.email, poop, date);
  return { success: true };
}

export async function loader() {
  return redirect("/");
}
