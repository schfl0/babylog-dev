import { redirect } from "react-router";
import { editMed } from "../../actions.server";
import { z } from "zod";
import { buildUrl } from "../../appconfig";
import { getUtcDate } from "../utils";

const MedSchema = z.object({
  id: z.string(),
  med: z.string(),
  unit: z.enum(["g", "mg", "mcg", "ng", "l", "ml", "drops", "u"]),
  quantity: z.coerce.number().nonnegative({ message: "Quantity must be >= 0" }),
  date: z.iso.date({ message: "Date must be YYYY-MM-DD" }),
  time: z.iso.time({ message: "Time must be HH:MM[:SS]" }),
  timezoneOffset: z.coerce.number(),
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
  const data = MedSchema.safeParse(rawData);

  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const { id, med, unit, quantity, date, time, timezoneOffset } = data.data;

  const utcDate = getUtcDate(date, time, timezoneOffset);

  await editMed(id, med, unit, quantity, utcDate);

  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
