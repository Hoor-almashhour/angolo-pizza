import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createGalleryItem, getGallery } from "@/lib/data-store";

export async function GET() {
  const items = await getGallery();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const item = await createGalleryItem(body);
  return NextResponse.json(item, { status: 201 });
}
