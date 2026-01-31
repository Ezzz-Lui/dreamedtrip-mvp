import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryCode = searchParams.get("country") ?? "default";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("emergency_numbers")
    .select("country_code, label, number, sort_order")
    .in("country_code", ["default", countryCode])
    .order("sort_order", { ascending: true });
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({ emergency_numbers: data ?? [] });
}
