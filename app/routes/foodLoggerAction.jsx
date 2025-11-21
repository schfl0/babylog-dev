import { redirect } from "react-router";
import { logFood } from "../../actions.server.js";
import { z } from "zod";
import { buildUrl } from "../../appconfig";

const FoodSchema = z.object({
  food: z.string(),
  g: z.coerce.number().nonnegative({ message: "G must be >= 0" }),
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
  const data = FoodSchema.safeParse(rawData);

  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const { food, g } = data.data;
  const date = new Date();
  await logFood(session?.user.email, food, g, date);
  return { success: true };
}

export async function loader() {
  return redirect("/");
}
