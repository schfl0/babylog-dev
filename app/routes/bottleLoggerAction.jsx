import { redirect } from "react-router";
import { logBottle } from "../../actions.server.js";
import { z } from "zod";
import { buildUrl } from "../../appconfig";

const BottleSchema = z.object({
  ml: z.coerce.number().nonnegative({ message: "Ml must be >= 0" }),
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
  const data = BottleSchema.safeParse(rawData);

  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const { ml } = data.data;
  const date = new Date();
  await logBottle(session?.user.email, ml, date);
  return { success: true };
}

export async function loader() {
  return redirect("/");
}
