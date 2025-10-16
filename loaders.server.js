import mongoClientPromise from "./mongodb.server.js";

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

  const res = await db
    .collection(collection)
    .find({ email })
    .sort({ date: -1 })
    .toArray();
  return res;
}

export async function getTodayViews(email) {
  const client = await mongoClientPromise;
  const db = client.db();
  const res = await db.collection("todayViews").findOne({ email });
  return res?.todayViews ?? [];
}

export async function getNapLogs(email) {
  const client = await mongoClientPromise;
  const db = client.db();
  const res = await db
    .collection("naps")
    .find({ email, stop: { $exists: true } })
    .toArray();
  return res;
}
