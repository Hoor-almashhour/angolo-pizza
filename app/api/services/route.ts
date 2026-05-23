import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createService, getServices } from "@/lib/data-store";
export const runtime = "nodejs";
export async function GET() {
  const services = await getServices();
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const service = await createService(body);
  return NextResponse.json(service, { status: 201 });
}
