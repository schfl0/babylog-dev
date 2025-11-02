import { redirect } from "react-router";
import { editBottle } from "../../actions.server";
import { z } from "zod";
import { buildUrl } from "../../appconfig";

const BottleSchema = z.object({
  id: z.string(),
  ml: z.coerce.number().nonnegative({ message: "Ml must be >= 0" }),
  date: z.iso.date({ message: "Date must be YYYY-MM-DD" }),
  time: z.iso.time({ message: "Time must be HH:MM[:SS]" }),
});

export async function action({ request }) {
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

  const { id, ml, date, time } = data.data;

  const dateObj = new Date(`${data.data.date}T${data.data.time}:00`);
  const dateISO = dateObj.toISOString();

  await editBottle(id, ml, dateISO);

  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
