import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/adminAuth";

async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSessionToken(token)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b-2 border-brown/10">
        <Container className="flex items-center justify-between py-3">
          <Link href="/admin/roster" className="font-heading font-extrabold text-lg text-brown">
            Soccer Cubs Roster
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-semibold text-brown-soft hover:text-orange"
            >
              Log out
            </button>
          </form>
        </Container>
      </header>
      <Container className="py-8">{children}</Container>
    </div>
  );
}
