import mongoClientPromise from "./mongodb.server.js";
import { getUtcDate, getUtcDateDtf } from "./app/utils.js";

export async function getLoggers(email) {
  const client = await mongoClientPromise;
  const db = client.db();
  const res = await db.collection("loggers").findOne({ email });
  return res?.loggers ?? [];
}

export async function getRunningNap(email) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db.collection("naps").findOne({
    email,
    stop: { $exists: false },
  });
  return res;
}

export async function getLogs(collection, email) {
  const client = await mongoClientPromise;
  const db = client.db();

  const docs = await db
    .collection(collection)
    .find({ email })
    .sort({ date: -1 })
    .toArray();
  return docs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
}

export async function getTimezone(email) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db.collection("users").findOne({ email });
  console.log("RES:", res);

  return res.timezone || "UTC";
}

export async function getTodayLogs(collection, email, timezone) {
  const client = await mongoClientPromise;
  const db = client.db();

  // const utcDate = getUtcDate(date, "00:00", timezoneOffset);
  // const end = new Date(utcDate);
  // end.setUTCDate(end.getUTCDate() + 1);

  const localDate = new Date();
  const utcDate = getUtcDateDtf(
    `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")}`,
    "00",
    timezone,
  );

  const end = new Date(utcDate);
  end.setUTCDate(end.getUTCDate() + 1);

  const docs = await db
    .collection(collection)
    .find({ email, date: { $gte: utcDate, $lt: end } })
    .sort({ date: -1 })
    .toArray();
  return docs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
}

export async function getTodayView(email) {
  const client = await mongoClientPromise;
  const db = client.db();
  const res = await db.collection("todayView").findOne({ email });
  return res?.todayView || "overview";
}

export async function getNapLogs(email) {
  const client = await mongoClientPromise;
  const db = client.db();
  const docs = await db
    .collection("naps")
    .find({ email, stop: { $exists: true } })
    .toArray();
  return docs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
}

export async function getAllView(email) {
  const client = await mongoClientPromise;
  const db = client.db();
  const res = await db.collection("allView").findOne({ email });
  return res?.allView || "overview";
}
