import "server-only";
import { supabaseAdmin } from "./supabase";

export type PublicLocation = {
  id: string;
  name: string;
  address: string | null;
  class_day: string | null;
};

// Used by the Locations page and the first step of sign-up. Deliberately
// selects only name/address/class_day — never monthly_price_cents — so a
// price can never leak into a page's HTML or a fetch response before the
// review step.
export async function getPublicLocations(): Promise<PublicLocation[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("locations")
      .select("id, name, address, class_day")
      .eq("active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to load locations", error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("Supabase not configured yet", err);
    return [];
  }
}
