import { redirect } from "next/navigation";

// The location picker now lives at /signup itself — keep this route around
// so old links/bookmarks don't 404.
export default function LocationsRedirect() {
  redirect("/signup");
}
