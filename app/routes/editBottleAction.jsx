import { redirect } from "react-router";
import { editBottle } from "../../actions.server";
import { z } from "zod";
import { buildUrl } from "../../appconfig";
import { getUtcDate } from "../utils";

const BottleSchema = z.object({
  id: z.string(),
  type: z.enum(["formula", "breast milk"]),
  ml: z.coerce.number().nonnegative({ message: "Ml must be >= 0" }),
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
  const data = BottleSchema.safeParse(rawData);
  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const { id, type, ml, date, time, timezoneOffset } = data.data;

  console.log(id);
  const utcDate = getUtcDate(date, time, timezoneOffset);

  await editBottle(id, type, ml, utcDate);

  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
