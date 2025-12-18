import { redirect } from "react-router";
import { logTemp } from "../../actions.server";
import { z } from "zod";
import { buildUrl } from "../../appconfig";

const TempSchema = z.object({
  temp: z.coerce.number().nonnegative({ message: "Temp must be >= 0" }),
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

  const data = TempSchema.safeParse(rawData);

  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const { temp } = data.data;
  const date = new Date();
  await logTemp(session?.user.email, temp, date);
  return { success: true };
}

export async function loader() {
  return redirect("/");
}
