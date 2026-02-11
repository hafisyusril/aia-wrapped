import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const body = await req.json();

    const baseUrl = "https://api.aiavitalitywrapped.id";

    const res = await fetch(`${baseUrl}/api/v1/vitality/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
      keepalive: true,
    });

    const contentType = res.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await res.json()
      : null;

    return NextResponse.json(data ?? { success: true }, {
      status: res.status,
    });
  } catch (err) {
    console.error("Share proxy error:", err);
    return NextResponse.json(
      { error: "Failed to track share" },
      { status: 500 },
    );
  }
}
