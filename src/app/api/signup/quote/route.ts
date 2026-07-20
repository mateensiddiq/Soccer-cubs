import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";

const bodySchema = z.object({
  locationId: z.string().uuid(),
});

// This is the only endpoint that ever returns a price to the browser, and
// only for the single location the parent just selected — never a list of
// all locations' prices.
export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return Response.json({ error: "Invalid location." }, { status: 400 });
  }

  const { data: location, error } = await supabaseAdmin()
    .from("locations")
    .select("id, name, monthly_price_cents, active")
    .eq("id", parsed.data.locationId)
    .single();

  if (error || !location || !location.active) {
    return Response.json({ error: "Location not found." }, { status: 404 });
  }

  return Response.json({
    locationName: location.name,
    monthlyPriceCents: location.monthly_price_cents,
  });
}
