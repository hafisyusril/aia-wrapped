import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.user_id || !body?.action) {
      return NextResponse.json(
        { error: "Invalid audit payload" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    const res = await fetch(`${baseUrl}/api/v1/audit-logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
      keepalive: true,
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {}

    return NextResponse.json(data ?? { success: true }, { status: res.status });
  } catch (err) {
    console.error("Audit proxy error:", err);
    return NextResponse.json({ error: "Failed to log audit" }, { status: 500 });
  }
}
