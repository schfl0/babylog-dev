import { redirect } from "react-router";
import { logMed } from "../../actions.server.js";
import { z } from "zod";
import { buildUrl } from "../../appconfig";

const MedSchema = z.object({
  med: z.string(),
  unit: z.enum(["g", "mg", "mcg", "ng", "l", "ml", "drops", "u"]),
  quantity: z.coerce.number().nonnegative({ message: "Quantity must be >= 0" }),
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
  const data = MedSchema.safeParse(rawData);

  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const { med, unit, quantity } = data.data;

  const date = new Date();
  await logMed(session?.user.email, med, unit, quantity, date);
  return { success: true };
}

export async function loader() {
  return redirect("/");
}
