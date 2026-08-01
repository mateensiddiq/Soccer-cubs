import "server-only";
import { supabaseAdmin } from "./supabase";
import type { PricingMode } from "@/types/database";

export type PublicLocation = {
  id: string;
  name: string;
  address: string | null;
  class_day: string | null;
  pricing_mode: PricingMode;
  has_full_year_option: boolean;
};

// Used by the Locations page and the first step of sign-up. Deliberately
// never returns monthly_price_cents or full_year_price_cents themselves —
// only a boolean derived from whether a full-year price is set — so no
// price can leak into a page's HTML or a fetch response before the review
// step.
export async function getPublicLocations(): Promise<PublicLocation[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("locations")
      .select("id, name, address, class_day, pricing_mode, full_year_price_cents")
      .eq("active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to load locations", error);
      return [];
    }

    return (data ?? []).map((loc) => ({
      id: loc.id,
      name: loc.name,
      address: loc.address,
      class_day: loc.class_day,
      pricing_mode: loc.pricing_mode,
      has_full_year_option: loc.full_year_price_cents != null,
    }));
  } catch (err) {
    console.error("Supabase not configured yet", err);
    return [];
  }
}

export type PublicSession = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  class_count: number;
};

// Used by the session-picker step for session-based locations. Deliberately
// selects no price, same rule as getPublicLocations.
export async function getPublicSessions(locationId: string): Promise<PublicSession[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("sessions")
      .select("id, name, start_date, end_date, class_count")
      .eq("location_id", locationId)
      .eq("active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to load sessions", error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("Supabase not configured yet", err);
    return [];
  }
}
