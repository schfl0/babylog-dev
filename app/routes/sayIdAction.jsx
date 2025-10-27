import { redirect } from "react-router";
import { ObjectId } from "mongodb";

export async function action({ request }) {
  const formData = await request.formData();
  const Id = formData.get("sayId");
  const obId = new ObjectId(Id);
  console.log("ID:", obId);
  return redirect("/");
}
