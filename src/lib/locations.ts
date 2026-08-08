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

// Used by a school's dedicated sign-up page. Same field allowlist as
// getPublicLocations — no price fields.
export async function getPublicLocation(locationId: string): Promise<PublicLocation | null> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("locations")
      .select("id, name, address, class_day, pricing_mode, full_year_price_cents")
      .eq("id", locationId)
      .eq("active", true)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.name,
      address: data.address,
      class_day: data.class_day,
      pricing_mode: data.pricing_mode,
      has_full_year_option: data.full_year_price_cents != null,
    };
  } catch (err) {
    console.error("Supabase not configured yet", err);
    return null;
  }
}

export type PublicClassGroup = {
  id: string;
  label: string;
  age_range: string | null;
  time_range: string | null;
};

// Used on a school's sign-up page to show/pick a class time. Locations with
// only one active group don't need a picker in the UI — the single group's
// id is just used automatically.
export async function getPublicClassGroups(locationId: string): Promise<PublicClassGroup[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("class_groups")
      .select("id, label, age_range, time_range")
      .eq("location_id", locationId)
      .eq("active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to load class groups", error);
      return [];
    }

    return data ?? [];
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
