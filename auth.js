import Google from "@auth/express/providers/google";
import Credentials from "@auth/express/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import mongoClientPromise from "./mongodb.server.js";

export const authConfig = {
  trustHost: true,
  providers: [
    Google({
      authorization: {
        params: { prompt: "select_account" },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const client = await mongoClientPromise;
        const db = client.db();
        const userExists = await db
          .collection("users")
          .findOne({ email: email });
        if (!userExists) {
          return null;
        }
        if (!userExists.credentials) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          userExists.password,
        );
        if (!isPasswordValid) {
          return null;
        }

        return userExists;
      },
    }),
  ],
  //adapter: MongoDBAdapter(mongoClientPromise),
  // session: {
  //   strategy: "database",
  // },
  callbacks: {
    async signIn({ user }) {
      const client = await mongoClientPromise;
      const db = client.db();
      const userExists = await db
        .collection("users")
        .findOne({ email: user.email });
      if (userExists) {
        if (!userExists.image) {
          await db
            .collection("users")
            .updateOne(
              { email: userExists.email },
              { $set: { image: user.image } },
            );
        }

        return true;
      }

      await db.collection("users").insertOne({
        username: user.name,
        email: user.email,
        image: user.image,
        credentials: false,
      });

      return true;
    },
    async session({ session }) {
      const client = await mongoClientPromise;
      const db = client.db();
      const userExists = await db
        .collection("users")
        .findOne({ email: session.user.email });
      if (userExists) {
        session.user.id = userExists._id.toString();
        session.user.name = userExists.username;
        session.user.image = userExists.image;
        session.user.timezone = userExists.timezone || "UTC";
      }
      return session;
    },
  },
};
