import mongoClientPromise from "./mongodb.server.js";
import { getUtcDate, getUtcDateDtf } from "./app/utils.js";

export async function getLoggers(email) {
  const client = await mongoClientPromise;
  const db = client.db();
  const res = await db.collection("loggers").findOne({ email });
  return res?.loggers ?? [];
}

export async function getOpenNap(email) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db.collection("naps").findOne({
    email,
    stop: { $exists: false },
  });
  return res;
}

export async function getOpenBreastLeft(email) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db.collection("breasts").findOne({
    email,
    position: "l",
    stop: { $exists: false },
  });
  return res;
}

export async function getOpenBreastRight(email) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db.collection("breasts").findOne({
    email,
    position: "r",
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
  return res.timezone || "UTC";
}

export async function getTodayLogs(collection, email, timezone) {
  const client = await mongoClientPromise;
  const db = client.db();

  const nowInTz = new Date(
    new Date().toLocaleString("en-US", { timeZone: timezone }),
  );
  const start = new Date(
    nowInTz.getFullYear(),
    nowInTz.getMonth(),
    nowInTz.getDate(),
  );

  const end = new Date(
    nowInTz.getFullYear(),
    nowInTz.getMonth(),
    nowInTz.getDate() + 1,
  );

  const dateField = collection === "naps" ? "start" : "date";

  const docs = await db
    .collection(collection)
    .find({ email, [dateField]: { $gte: start, $lt: end } })
    .sort({ [dateField]: -1 })
    .toArray();

  return docs.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));
}

export async function getAllLogs(collection, email, { cursor, limit } = {}) {
  const client = await mongoClientPromise;
  const db = client.db();

  const isNap = collection === "naps";
  const timeField = isNap ? "start" : "date";

  const query = {
    email,
  };
  if (cursor) {
    try {
      const [time, id] = cursor.split("|");
      query.$or = [
        { [timeField]: { $lt: new Date(time) } },
        {
          [timeField]: new Date(time),
          _id: { $lt: new ObjectId(id) },
        },
      ];
    } catch {
      // Invalid cursor -> ignore
    }
  }

  const docs = await db
    .collection(collection)
    .find(query)
    .sort({ [timeField]: -1, _id: -1 })
    .limit(limit + 1)
    .toArray();

  const hasNextPage = docs.length > limit;
  const items = hasNextPage
    ? docs
        .slice(0, limit)
        .map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }))
    : docs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
  const last = items[items.length - 1];
  return {
    items,
    nextCursor:
      hasNextPage && last
        ? `${last[timeField].toISOString()}|${last.id}}`
        : null,
  };
}

export async function getDateLogs(collection, email, dateStr, timezone) {
  const client = await mongoClientPromise;
  const db = client.db();

  const [year, month, day] = dateStr.split("-").map(Number);
  const startInTz = new Date(
    new Date(Date.UTC(year, month - 1, day)).toLocaleString("en-US", {
      timeZone: timezone,
    }),
  );
  const end = new Date(startInTz.getTime() + 24 * 60 * 60 * 1000);

  const dateField = collection === "naps" ? "start" : "date";

  const docs = await db
    .collection(collection)
    .find({ email, [dateField]: { $gte: startInTz, $lt: end } })
    .sort({ [dateField]: -1 })
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
