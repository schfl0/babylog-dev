import mongoClientPromise from "./mongodb.server.js";

export async function addLogger(email, logger) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("loggers")
    .findOneAndUpdate(
      { email },
      { $addToSet: { loggers: logger } },
      { upsert: true, returnDocument: "after" },
    );
}

export async function deleteLogger(email, logger) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("loggers")
    .findOneAndUpdate(
      { email },
      { $pull: { loggers: logger } },
      { returnDocument: "after" },
    );
}

export async function logBottle(email, ml, date) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("bottles")
    .insertOne({ email, log: "bottle", ml, date });
}

export async function logFood(email, food, g, date) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("foods")
    .insertOne({ email, log: "food", food, g, date });
}

export async function logNap(email, triggerNap) {
  const date = new Date();
  const client = await mongoClientPromise;
  const db = client.db();

  if (triggerNap === "start") {
    const openNap = await db
      .collection("naps")
      .findOne({ email, stop: { $exists: false } });

    if (openNap) {
      return { error: "Nap already in progress" };
    }

    const res = await db
      .collection("naps")
      .insertOne({ email, log: "nap", start: date });
    return { status: "Nap started", start: date };
  }

  if (triggerNap === "stop") {
    const openNap = await db.collection("naps").findOneAndUpdate(
      {
        email,
        stop: { $exists: false },
      },
      { $set: { stop: date } },
      { sort: { start: -1 }, returnDocument: "after" },
    );

    if (!openNap) {
      return { error: "No nap in progress" };
    }

    return { status: "stopped", nap: openNap };
  }
  return { error: "Unknown trigger" };
}

export async function logPoop(email, g, date) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("poops")
    .insertOne({ email, log: "poop", g, date });
}

export async function logTemp(email, temp, date) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("temps")
    .insertOne({ email, log: "temp", temp, date });
}

export async function logMed(email, med, g, date) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("meds")
    .insertOne({ email, log: "med", med, g, date });
}

export async function selectTodayView(email, todayView) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("todayView")
    .findOneAndUpdate(
      { email },
      { $set: { todayView: todayView } },
      { upsert: true, returnDocument: "after" },
    );
}

export async function deleteTodayView(email, todayView) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("todayViews")
    .findOneAndUpdate(
      { email },
      { $pull: { todayViews: todayView } },
      { returnDocument: "after" },
    );
}

export async function selectAllView(email, allView) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("allView")
    .findOneAndUpdate(
      { email },
      { $set: { allView: allView } },
      { upsert: true, returnDocument: "after" },
    );
}
