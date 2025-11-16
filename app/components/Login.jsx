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
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center self-center">
      <form className="w-full" action="/api/auth/signin/google" method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <button
          className="flex w-full cursor-pointer items-center justify-between rounded-sm border border-gray-200 px-4 py-2.5 text-sm shadow-md transition-all hover:opacity-60"
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
    </div>
  );
}
