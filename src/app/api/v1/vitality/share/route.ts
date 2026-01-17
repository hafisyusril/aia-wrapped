import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    const res = await fetch(`${baseUrl}/api/v1/vitality/share`, {
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
    console.error("Share proxy error:", err);
    return NextResponse.json(
      { error: "Failed to track share" },
      { status: 500 }
    );
  }
}
