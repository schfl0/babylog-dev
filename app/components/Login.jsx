import { useEffect, useState } from "react";

export default function Login() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/csrf", { credentials: "include" });
      const data = await res.json();
      setCsrfToken(data.csrfToken);
    })();
  }, []);
  if (!csrfToken) {
    return <div>Loading...</div>;
  }

  return (
    <form
      className="w-full"
      action="/api/auth/signin/google"
      method="POST"
      className="mt-8"
    >
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <button
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-white/30 bg-white/30 px-4 py-3 text-base shadow-md backdrop-blur-xl transition-all hover:opacity-60"
        type="submit"
      >
        <p>Sign in with Google</p>
        <img
          loading="lazy"
          height="24"
          width="24"
          src="http://authjs.dev/img/providers/google.svg"
        />
      </button>
    </form>
  );
}
