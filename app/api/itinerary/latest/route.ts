import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Itinerary } from "@/lib/types/itinerary";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { data: row, error } = await supabase
    .from("itineraries")
    .select("id, days, summary, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ message: "No latest itinerary" }, { status: 404 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  const itinerary: Itinerary = {
    id: row.id,
    days: row.days ?? [],
    summary: row.summary ?? { totalEstimatedCost: 0, totalDays: 0 },
    profileId: user.id,
    createdAt: row.created_at,
  };
  return NextResponse.json({ itinerary });
}
