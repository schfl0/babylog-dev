import { redirect } from "react-router";
import { editPoop } from "../../actions.server";
import { z } from "zod";
import { buildUrl } from "../../appconfig";
import { getUtcDate } from "../utils";

const PoopSchema = z.object({
  id: z.string(),
  poop: z.enum(["sm", "md", "lg", "xl"]),
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
  console.log("RAW:", rawData);
  const data = PoopSchema.safeParse(rawData);

  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const { id, poop, date, time, timezoneOffset } = data.data;

  const utcDate = getUtcDate(date, time, timezoneOffset);

  await editPoop(id, poop, utcDate);

  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
