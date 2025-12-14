import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useSession } from "../sessionContext";

export default function Nav() {
  const { session } = useSession();
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/csrf", { credentials: "include" });
      const data = await res.json();
      setCsrfToken(data.csrfToken);
    })();
  }, []);
  return (
    <nav className="flex items-center gap-4 p-4 text-xs">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-pink-600"
            : "font-bold text-black transition-all hover:opacity-60"
        }
      >
        👶 BabyLog
      </NavLink>
      <NavLink
        to="/logs"
        className={({ isActive }) =>
          isActive
            ? "text-pink-600"
            : "text-black transition-all hover:opacity-60"
        }
      >
        📝 Logs
      </NavLink>
      {session && csrfToken && (
        <form
          action="/api/auth/signout"
          method="POST"
          className="ml-auto flex items-center justify-center gap-2"
        >
          <img className="h-8 w-8 rounded-full" src={session.user.image} />

          <input type="hidden" name="csrfToken" value={csrfToken} />
          <button
            type="submit"
            className="cursor-pointer rounded-sm bg-pink-600 px-2 py-1 text-white transition-all hover:opacity-60"
          >
            🔒 Sign out
          </button>
        </form>
      )}
    </nav>
  );
}
