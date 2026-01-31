import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.subject || !body.message) {
      return NextResponse.json(
        { ok: false, message: "Subject and message are required" },
        { status: 400 }
      );
    }
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { data, error } = await supabase
      .from("support_tickets")
      .insert({
        user_id: user.id,
        booking_id: body.bookingId ?? null,
        subject: body.subject,
        message: body.message,
        status: "open",
      })
      .select("id")
      .single();
    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, ticketId: data?.id });
  } catch {
    return NextResponse.json({ ok: false, message: "Bad request" }, { status: 400 });
  }
}
