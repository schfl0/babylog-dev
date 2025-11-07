import { redirect } from "react-router";
import { editNap } from "../../actions.server";
import { z } from "zod";
import { buildUrl } from "../../appconfig";

const NapSchema = z.object({
  id: z.string(),
  startDate: z.iso.date({ message: "Date must be YYYY-MM-DD" }),
  startTime: z.iso.time({ message: "Time must be HH:MM[:SS]" }),
  stopDate: z.iso.date({ message: "Date must be YYYY-MM-DD" }),
  stopTime: z.iso.time({ message: "Time must be HH:MM[:SS]" }),
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
  const data = NapSchema.safeParse(rawData);

  if (!data.success) {
    return data.error.flatten().fieldErrors;
  }

  const { id, startDate, startTime, stopDate, stopTime } = data.data;

  const startDateObj = new Date(
    `${data.data.startDate}T${data.data.startTime}:00`,
  );
  const startDateISO = startDateObj.toISOString();
  const stopDateObj = new Date(
    `${data.data.stopDate}T${data.data.stopTime}:00`,
  );
  const stopDateISO = stopDateObj.toISOString();

  await editNap(id, startDateISO, stopDateISO);

  return redirect("/logs");
}

export async function loader() {
  throw redirect("/logs");
}
