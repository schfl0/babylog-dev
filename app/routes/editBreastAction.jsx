import { redirect } from "react-router";
import { editBreast } from "../../actions.server";
import { z } from "zod";
import { buildUrl } from "../../appconfig";
import { getUtcDate } from "../utils";

const BreastSchema = z.object({
  id: z.string(),
  position: z.enum(["l", "r"]),
  startDate: z.iso.date({ message: "Date must be YYYY-MM-DD" }),
  startTime: z.iso.time({ message: "Time must be HH:MM[:SS]" }),
  stopDate: z.iso.date({ message: "Date must be YYYY-MM-DD" }),
  stopTime: z.iso.time({ message: "Time must be HH:MM[:SS]" }),
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
  const data = BreastSchema.safeParse(rawData);

  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const {
    id,
    position,
    startDate,
    startTime,
    stopDate,
    stopTime,
    timezoneOffset,
  } = data.data;

  const utcStart = getUtcDate(startDate, startTime, timezoneOffset);
  const utcStop = getUtcDate(stopDate, stopTime, timezoneOffset);
  await editBreast(id, position, utcStart, utcStop);

  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
