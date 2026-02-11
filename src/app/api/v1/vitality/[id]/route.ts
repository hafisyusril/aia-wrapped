import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing vitality id" },
        { status: 400 },
      );
    }

    const baseUrl = "https://api.aiavitalitywrapped.id";

    const res = await fetch(`${baseUrl}/api/v1/vitality/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      let errorBody: any = null;
      try {
        errorBody = await res.json();
      } catch {}

      return NextResponse.json(
        {
          error: errorBody?.error ?? `Backend error: ${res.status}`,
        },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Vitality proxy error:", err);
    return NextResponse.json(
      { error: "Failed to fetch vitality data" },
      { status: 500 },
    );
  }
}
