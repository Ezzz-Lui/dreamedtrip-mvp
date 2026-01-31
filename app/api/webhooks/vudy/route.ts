import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let body: { event?: string; data?: { requestId?: string; customId?: string } };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (body?.event !== "requestPaid") {
    return NextResponse.json({ received: true }, { status: 200 });
  }
  const requestId = body?.data?.requestId ?? body?.data?.customId;
  if (!requestId) {
    return NextResponse.json({ received: true }, { status: 200 });
  }
  const supabase = createServiceRoleClient();
  const { data: booking } = await supabase
    .from("bookings")
    .select("id")
    .eq("vudy_request_id", requestId)
    .eq("status", "pending_payment")
    .limit(1)
    .single();
  if (!booking) {
    const { data: byCustomId } = await supabase
      .from("bookings")
      .select("id")
      .eq("id", requestId)
      .eq("status", "pending_payment")
      .limit(1)
      .single();
    if (byCustomId) {
      await supabase.from("bookings").update({ status: "confirmed" }).eq("id", byCustomId.id);
    }
  } else {
    await supabase.from("bookings").update({ status: "confirmed" }).eq("id", booking.id);
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
