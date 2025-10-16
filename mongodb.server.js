import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;
console.log("MongoDB URI:", uri);
if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const client = new MongoClient(uri);
const mongoClientPromise = client.connect();

export default mongoClientPromise;
