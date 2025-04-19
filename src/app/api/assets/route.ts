import { NextResponse } from "next/server";
import { assets } from "../mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const textSearch = searchParams.get("textSearch")?.toLowerCase() || "";

  const filtered = textSearch
    ? assets.filter((a) => a.title.toLowerCase().includes(textSearch))
    : assets;

  return NextResponse.json(filtered);
}
