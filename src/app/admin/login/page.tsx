import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/Button";
import { TextField } from "@/components/FormField";
import {
  ADMIN_SESSION_COOKIE,
  checkAdminPassword,
  createAdminSessionToken,
} from "@/lib/adminAuth";

async function login(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");

  if (!checkAdminPassword(password)) {
    // Deliberate delay on a wrong guess — with a short password, this is
    // what keeps an automated script from brute-forcing it quickly.
    await new Promise((resolve) => setTimeout(resolve, 1500));
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });

  redirect("/admin/roster");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm bg-white rounded-3xl border-2 border-brown/10 shadow-sm p-8">
        <h1 className="font-heading font-extrabold text-2xl text-brown text-center">
          Soccer Cubs Roster
        </h1>
        <p className="mt-1 text-sm text-brown-soft text-center">
          Coach login
        </p>

        <form action={login} className="mt-6 space-y-4">
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            required
            autoFocus
          />
          {error && (
            <p className="text-sm font-semibold text-orange-dark">
              Incorrect password. Try again.
            </p>
          )}
          <Button type="submit" variant="primary" className="w-full">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
