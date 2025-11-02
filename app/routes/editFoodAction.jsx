import { redirect } from "react-router";
import { editFood } from "../../actions.server";
import { z } from "zod";
import { buildUrl } from "../../appconfig";

const FoodSchema = z.object({
  id: z.string(),
  food: z.string(),
  g: z.coerce.number().nonnegative({ message: "G must be >= 0" }),
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
  const data = FoodSchema.safeParse(rawData);

  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const { id, food, g, date, time } = data.data;

  const dateObj = new Date(`${data.data.date}T${data.data.time}:00`);
  const dateISO = dateObj.toISOString();

  await editFood(id, food, g, dateISO);

  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
