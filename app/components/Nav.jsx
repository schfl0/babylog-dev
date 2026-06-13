import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useSession } from "../sessionContext";
import { FaArrowRightFromBracket } from "react-icons/fa6";

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
    <nav className="flex items-center gap-6 rounded-xl border border-white/30 bg-white/30 p-6 px-4 shadow-lg backdrop-blur-xl">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-pink-600"
            : "font-bold text-slate-700 transition-all hover:opacity-60"
        }
      >
        👶 BByLog
      </NavLink>
      <NavLink
        to="/logs"
        className={({ isActive }) =>
          isActive
            ? "text-pink-600"
            : "text-slate-700 transition-all hover:opacity-60"
        }
      >
        📝 Logs
      </NavLink>
      {session && csrfToken && (
        <form
          action="/api/auth/signout"
          method="POST"
          className="ml-auto flex items-center justify-center gap-4"
        >
          <img className="h-8 w-8 rounded-full" src={session.user.image} />

          <input type="hidden" name="csrfToken" value={csrfToken} />
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-pink-600 px-3 py-1.5 text-white transition-all hover:opacity-60"
          >
            <FaArrowRightFromBracket />
          </button>
        </form>
      )}
    </nav>
  );
}
