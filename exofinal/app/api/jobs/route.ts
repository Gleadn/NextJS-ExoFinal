import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/prismicio";

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("uids") ?? "";
  const uids = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (uids.length === 0) {
    return NextResponse.json([]);
  }

  const client = createClient();
  const jobs = await Promise.all(
    uids.map((uid) => client.getByUID("job_offer", uid).catch(() => null))
  );

  return NextResponse.json(jobs.filter(Boolean));
}
