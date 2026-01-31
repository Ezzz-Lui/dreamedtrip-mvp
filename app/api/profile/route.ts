import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { TravelerProfile } from "@/lib/types/traveler";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, traveler_profile, updated_at")
    .eq("user_id", user.id)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ message: "No profile" }, { status: 404 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({
    ok: true,
    profile: profile?.traveler_profile as TravelerProfile | null,
    profileId: profile?.id,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TravelerProfile;
    if (
      !body.country ||
      !body.destinationType ||
      body.days == null ||
      !body.budget ||
      !body.party ||
      !body.pace ||
      !Array.isArray(body.interests)
    ) {
      return NextResponse.json({ message: "Invalid profile" }, { status: 400 });
    }
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { data: profile, error } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: user.id,
          traveler_profile: body,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select("id")
      .single();
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, profileId: profile?.id });
  } catch {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
}
