import { NextResponse } from "next/server";
import { assets } from "../../mockData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, { params }: any) {
  const { id } = await params;
  const asset = assets.find((a) => a.id === id);
  if (!asset) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(asset);
}
