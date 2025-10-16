import { getSession } from "@auth/express";
import { authConfig } from "./auth.js";

export async function authenticatedUser(req, res, next) {
  const session =
    res.locals.session ?? (await getSession(req, authConfig)) ?? undefined;
  res.locals.session = session;
  if (session) {
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
}

export async function currentSession(req, res, next) {
  const cookieHeader = req.headers.cookie ?? "";
  const session = (await getSession(req, authConfig)) ?? undefined;
  res.locals.session = session;
  return next();
}
