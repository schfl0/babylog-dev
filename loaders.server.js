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

  const docs = await db
    .collection(collection)
    .find({ email })
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
